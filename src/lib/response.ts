import { NextResponse } from "next/server";

export type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: { code?: string; details?: unknown } | string;
};

export function ok<T>(data?: T, message = "ok", init?: ResponseInit) {
  return NextResponse.json({ success: true, message, data } as ApiResponse<T>, {
    status: 200,
    ...init,
  });
}

export function created<T>(data?: T, message = "created", init?: ResponseInit) {
  return NextResponse.json({ success: true, message, data } as ApiResponse<T>, {
    status: 201,
    ...init,
  });
}

export function badRequest(message = "bad_request", error?: unknown) {
  return NextResponse.json({ success: false, message, error } as ApiResponse, {
    status: 400,
  });
}

export function unauthorized(message = "unauthorized", error?: unknown) {
  return NextResponse.json({ success: false, message, error } as ApiResponse, {
    status: 401,
  });
}

export function forbidden(message = "forbidden", error?: unknown) {
  return NextResponse.json({ success: false, message, error } as ApiResponse, {
    status: 403,
  });
}

export function notFound(message = "not_found", error?: unknown) {
  return NextResponse.json({ success: false, message, error } as ApiResponse, {
    status: 404,
  });
}

export function conflict(message = "conflict", error?: unknown) {
  return NextResponse.json({ success: false, message, error } as ApiResponse, {
    status: 409,
  });
}

export function serverError(message = "server_error", error?: unknown) {
  return NextResponse.json({ success: false, message, error } as ApiResponse, {
    status: 500,
  });
}
