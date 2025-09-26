import axios from "axios";
import { returnError } from "./utils";

export async function api<T = any>(url: string, options: { method?: "GET"|"POST"|"PUT"|"PATCH"|"DELETE"; body?: any; headers?: HeadersInit } = {}): Promise<{ data?: T; error?: string; status: number }>{
  try {
    const res = await fetch(url, { method: options.method ?? (options.body ? "POST" : "GET"), body: options.body ? JSON.stringify(options.body) : undefined, headers: { "Content-Type": "application/json", ...(options.headers||{}) } });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { error: (data?.error || data?.message) ?? res.statusText, status: res.status };
    return { data, status: res.status } as any;
  } catch (e) {
    return { error: returnError(e), status: 0 };
  }
}
