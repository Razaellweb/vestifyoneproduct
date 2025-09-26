import * as Sentry from "@sentry/nextjs";

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1,
    enableLogs: true,
    debug: process.env.NODE_ENV !== "production",
  });
} else {
  if (process.env.NODE_ENV !== "production") {
    console.warn("[Sentry] DSN not provided — error reporting is disabled.");
  }
}
