/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

export class BaseError extends Error {
  constructor(message: string, public statusCode?: number, public responseBody?: unknown) {
    super(message)
    this.name = 'BaseError'
  }
}

export class RateLimitError extends BaseError {
  constructor(message: string) {
    super(message, 429)
    this.name = 'RateLimitError'
  }
}

export interface BaseClientConfig {
  baseURL: string
  timeout?: number
  maxRetries?: number
  rateLimitDelay?: number
  headers?: Record<string, string>
  debug?: boolean
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface RequestOptions {
  payload?: Record<string, unknown>
  params?: Record<string, unknown>
  headers?: Record<string, string>
  baseURL?: string
}

export class BaseClient {
  private client: AxiosInstance
  private maxRetries: number
  private rateLimitDelay: number
  private lastRequestTime = 0
  private debug: boolean

  constructor(config: BaseClientConfig) {
    this.maxRetries = config.maxRetries ?? 3
    this.rateLimitDelay = config.rateLimitDelay ?? 200
    this.debug = config.debug ?? false

    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout ?? 60_000,
      headers: { 'User-Agent': 'VestifyOne', Accept: 'application/json', ...config.headers },
      validateStatus: () => true,
    })
  }

  private async rateLimitAsync(): Promise<void> {
    const now = Date.now()
    const timeSinceLast = now - this.lastRequestTime
    if (timeSinceLast < this.rateLimitDelay) {
      await new Promise(res => setTimeout(res, this.rateLimitDelay - timeSinceLast))
    }
    this.lastRequestTime = Date.now()
  }

  private extractErrorDetails(input: AxiosResponse | AxiosError): [string, unknown] {
    const response = 'isAxiosError' in axios && axios.isAxiosError(input) ? input.response : (input as AxiosResponse)
    const data = response?.data
    if (this.debug) console.debug('[Raw Error Response]', data)
    if (!data) return [`HTTP ${response?.status ?? '?'} - No response body`, null]
    if (typeof data === 'object') {
      const errorFields = ['err','error','message','detail','error_description']
      for (const field of errorFields) {
        const value = (data as Record<string, unknown>)[field]
        if (typeof value === 'string' && value.trim()) return [value, data]
        if (typeof value === 'object') return [JSON.stringify(value), data]
      }
      return [`API Error: ${JSON.stringify(data)}`, data]
    }
    return [String(data), data]
  }

  private async withRetry<T>(fn: () => Promise<T>, context: { method: string; url: string }): Promise<T> {
    let lastError: Error | undefined
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          const delay = Math.pow(2, attempt) * 1000
          if (this.debug) console.warn('Retrying request', { attempt: attempt + 1, delay, ...context })
          await new Promise(res => setTimeout(res, delay))
        }
        return await fn()
      } catch (error) {
        lastError = error as Error
        if (error instanceof BaseError && error.statusCode && error.statusCode >= 400 && error.statusCode < 500 && error.statusCode !== 429) {
          throw error
        }
        const shouldRetry =
          error instanceof RateLimitError ||
          (error instanceof BaseError && error.statusCode && error.statusCode >= 500) ||
          (axios.isAxiosError(error) && ['ECONNABORTED','ETIMEDOUT','ECONNRESET'].includes(error.code ?? ''))
        if (!shouldRetry) throw error
      }
    }
    throw new BaseError(`Max retries exceeded. Last error: ${lastError?.message}`, (lastError as any)?.statusCode)
  }

  async request<T>(method: HttpMethod, endpoint: string, options: RequestOptions = {}): Promise<T> {
    await this.rateLimitAsync()
    const fullUrl = new URL(endpoint, options.baseURL ?? this.client.defaults.baseURL).toString()
    if (this.debug) console.debug('[HTTP Request]', { method, endpoint: fullUrl, hasPayload: !!options.payload, hasParams: !!options.params })

    return this.withRetry(async () => {
      const config: AxiosRequestConfig = { method, url: endpoint, data: options.payload, params: options.params, headers: options.headers, ...(options.baseURL && { baseURL: options.baseURL }) }
      const response = await this.client.request(config)
      if (response.status === 429) throw new RateLimitError(`Rate limit exceeded. Retry after ${response.headers['retry-after'] ?? '60'}s`)
      if (response.status >= 400) {
        const [errorMsg, errorBody] = this.extractErrorDetails(response)
        throw new BaseError(`HTTP ${response.status}: ${errorMsg}`, response.status, errorBody)
      }
      return response.data as T
    }, { method, url: fullUrl })
  }
}
