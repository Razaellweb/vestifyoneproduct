// sentry.edge.config.ts
// Configures the initialization of Sentry for edge features (middleware, edge routes, etc).
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Enable logs to be sent to Sentry
    enableLogs: true,

    // Helpful during setup
    debug: process.env.NODE_ENV !== "production",
  });
} else {
  if (process.env.NODE_ENV !== "production") {
    console.warn("[Sentry] DSN not provided — error reporting is disabled.");
  }
}
