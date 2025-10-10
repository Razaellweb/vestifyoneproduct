/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

// ============================================================================
// Custom Error Classes
// ============================================================================

export class BaseError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public responseBody?: unknown
  ) {
    super(message);
    this.name = "BaseError";
  }
}

export class RateLimitError extends BaseError {
  constructor(message: string) {
    super(message, 429);
    this.name = "RateLimitError";
  }
}

// ============================================================================
// Types
// ============================================================================

export interface BaseClientConfig {
  baseURL: string;
  timeout?: number;
  maxRetries?: number;
  rateLimitDelay?: number;
  headers?: Record<string, string>;
  debug?: boolean;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: JSONValue }
  | JSONValue[];

export interface RequestOptions {
  payload?: Record<string, JSONValue>;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  baseURL?: string;
}

// ============================================================================
// BaseClient
// ============================================================================

export class BaseClient {
  private client: AxiosInstance;
  private maxRetries: number;
  private rateLimitDelay: number;
  private lastRequestTime = 0;
  private debug: boolean;

  constructor(config: BaseClientConfig) {
    this.maxRetries = config.maxRetries ?? 3;
    this.rateLimitDelay = config.rateLimitDelay ?? 200; // ms
    this.debug = config.debug ?? false;

    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout ?? 60_000,
      headers: {
        "User-Agent": "Syntax-os",
        Accept: "application/json",
        ...config.headers,
      },
      validateStatus: () => true, // let us handle errors
    });
  }

  // ==========================================================================
  // Utility Methods
  // ==========================================================================

  private static buildParams(
    params?: Record<string, unknown>
  ): Record<string, string | number | boolean> {
    if (!params) return {};
    const result: Record<string, string | number | boolean> = {};

    for (const [key, value] of Object.entries(params)) {
      if (value !== null && value !== undefined) {
        result[key] = Array.isArray(value) ? value.join(",") : (value as any);
      }
    }

    return result;
  }

  public static buildPayload(
    payload?: Record<string, unknown>
  ): Record<string, unknown> {
    if (!payload) return {};

    const cleanValue = (val: unknown): unknown => {
      if (val === null || val === undefined) return undefined;
      if (Array.isArray(val)) {
        return val.map(cleanValue).filter((v) => v !== undefined);
      }
      if (typeof val === "object" && val !== null) {
        return Object.entries(val).reduce((acc, [k, v]) => {
          const cleaned = cleanValue(v);
          if (cleaned !== undefined) acc[k] = cleaned;
          return acc;
        }, {} as Record<string, unknown>);
      }
      return val;
    };

    return cleanValue(payload) as Record<string, unknown>;
  }

  // ==========================================================================
  // Rate Limiting
  // ==========================================================================

  private async rateLimitAsync(): Promise<void> {
    const now = Date.now();
    const timeSinceLast = now - this.lastRequestTime;

    if (timeSinceLast < this.rateLimitDelay) {
      await this.sleep(this.rateLimitDelay - timeSinceLast);
    }

    this.lastRequestTime = Date.now();
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // ==========================================================================
  // Error Handling
  // ==========================================================================

  private extractErrorDetails(
    input: AxiosResponse | AxiosError
  ): [string, unknown] {
    const response =
      "isAxiosError" in axios && axios.isAxiosError(input)
        ? input.response
        : (input as AxiosResponse);

    const data = response?.data;

    if (this.debug) {
      console.debug("[Raw Error Response]", data);
    }

    if (!data) {
      return [`HTTP ${response?.status ?? "?"} - No response body`, null];
    }

    if (typeof data === "object") {
      const errorFields = [
        "err",
        "error",
        "message",
        "detail",
        "error_description",
      ];
      for (const field of errorFields) {
        const value = (data as Record<string, unknown>)[field];
        if (typeof value === "string" && value.trim()) {
          return [value, data];
        }
        if (typeof value === "object") {
          return [JSON.stringify(value), data];
        }
      }
      return [`API Error: ${JSON.stringify(data)}`, data];
    }

    return [String(data), data];
  }

  // ==========================================================================
  // Retry Logic
  // ==========================================================================

  private async withRetry<T>(
    fn: () => Promise<T>,
    context: { method: string; url: string }
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          const delay = Math.pow(2, attempt) * 1000; // exponential backoff
          console.warn(
            `Retrying request (attempt ${attempt + 1}/${this.maxRetries})`,
            {
              delay,
              ...context,
            }
          );
          await this.sleep(delay);
        }
        return await fn();
      } catch (error) {
        lastError = error as Error;

        // Non-retryable client errors
        if (error instanceof BaseError && error.statusCode) {
          if (
            error.statusCode >= 400 &&
            error.statusCode < 500 &&
            error.statusCode !== 429
          ) {
            throw error;
          }
        }

        // Retry only on specific cases
        const shouldRetry =
          error instanceof RateLimitError ||
          (error instanceof BaseError &&
            error.statusCode &&
            error.statusCode >= 500) ||
          (axios.isAxiosError(error) &&
            ["ECONNABORTED", "ETIMEDOUT", "ECONNRESET"].includes(
              error.code ?? ""
            ));

        if (!shouldRetry) throw error;

        console.warn(`Request failed, will retry: ${error.constructor.name}`, {
          attempt: attempt + 1,
          error: error.message,
        });
      }
    }

    throw new BaseError(
      `Max retries exceeded. Last error: ${lastError?.message}`,
      (lastError as any)?.statusCode
    );
  }

  // ==========================================================================
  // Core Request Method
  // ==========================================================================

  async request<T>(
    method: HttpMethod,
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    await this.rateLimitAsync();

    const fullUrl = new URL(
      endpoint,
      options.baseURL ?? this.client.defaults.baseURL
    ).toString();

    if (this.debug) {
      console.debug("[HTTP Request]", {
        method,
        endpoint: fullUrl,
        hasPayload: !!options.payload,
        hasParams: !!options.params,
        payloadSize: options.payload
          ? JSON.stringify(options.payload).length
          : 0,
      });
    }

    return this.withRetry(
      async () => {
        const config: AxiosRequestConfig = {
          method,
          url: endpoint,
          data: options.payload,
          params: options.params,
          headers: options.headers,
          ...(options.baseURL && { baseURL: options.baseURL }),
        };

        const response = await this.client.request(config);

        // Handle rate limiting
        if (response.status === 429) {
          const retryAfter = response.headers["retry-after"] ?? "60";
          throw new RateLimitError(
            `Rate limit exceeded. Retry after ${retryAfter}s`
          );
        }

        // Handle other errors
        if (response.status >= 400) {
          const [errorMsg, errorBody] = this.extractErrorDetails(response);

          console.error(
            `HTTP ${response.status} error - Raw response: ${JSON.stringify(
              response.data
            ).substring(0, 1000)}`,
            {
              statusCode: response.status,
              url: fullUrl,
              method,
              responseHeaders: response.headers,
            }
          );

          throw new BaseError(
            `HTTP ${response.status}: ${errorMsg}`,
            response.status,
            errorBody
          );
        }

        return response.data as T;
      },
      { method, url: fullUrl }
    );
  }
}
