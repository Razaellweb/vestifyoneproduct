import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins = [
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
];

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const isAllowed = allowedOrigins.includes(origin);
  const res = NextResponse.next();

  // CORS
  if (isAllowed) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  }
  res.headers.set("Vary", "Origin");
  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Idempotency-Key, X-Requested-With"
  );

  // Security headers
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "no-referrer");
  res.headers.set("Permissions-Policy", "geolocation=() ");

  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: res.headers });
  }

  return res;
}

export const config = {
  matcher: ["/api/:path*"],
};
