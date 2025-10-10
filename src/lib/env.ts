export const Env = {
  // App
  NODE_ENV: process.env.NODE_ENV || "development",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  // Supabase
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",

  // Auth
  AUTH_JWT_SECRET: process.env.BETTER_AUTH_SECRET || process.env.AUTH_JWT_SECRET || "change-me-in-prod",
  AUTH_ACCESS_TOKEN_TTL: parseInt(process.env.AUTH_ACCESS_TOKEN_TTL || "900"), // 15m
  AUTH_REFRESH_TOKEN_TTL: parseInt(process.env.AUTH_REFRESH_TOKEN_TTL || "2592000"), // 30d

  // Payments
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY || "",
  PAYSTACK_CALLBACK_URL: process.env.PAYSTACK_CALLBACK_URL || "",

  // Email
  RESEND_KEY: process.env.RESEND_API_KEY || process.env.RESEND_KEY || "",
  RESEND_FROM: process.env.RESEND_FROM || "no-reply@vestify.one",

  // KYC (QoreID)
  QOREID_CLIENT_ID: process.env.QOREID_CLIENT_ID || "",
  QOREID_CLIENT_SECRET: process.env.QOREID_CLIENT_SECRET || "",

  // Monitoring/Analytics
  SENTRY_DSN: process.env.SENTRY_DSN || "",
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
  NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST || "",
};
