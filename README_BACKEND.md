Vestify One Backend Foundation

Overview
- Next.js App Router APIs under src/app/api
- Supabase for auth, DB, storage
- Sentry for error monitoring
- Paystack + Flutterwave payments (init + webhook)
- Resend for transactional emails
- PostHog for analytics

Auth flows
- Email/password signup: POST /api/auth/signup
- Email/password sign-in: POST /api/auth/signin
- Google OAuth: GET /api/auth/oauth/google → returns URL to redirect
- Session: GET /api/auth/session

Core APIs
- Health: GET /api/health
- Users: GET /api/users/me
- Savings: 
  - GET /api/savings/accounts
  - POST /api/savings/accounts
  - POST /api/savings/deposit
- Loans:
  - POST /api/loans/apply
- Groups:
  - POST /api/groups/create
- Payments:
  - POST /api/payments/paystack/init
  - POST /api/payments/paystack/webhook
  - POST /api/payments/flutterwave/init
  - POST /api/payments/flutterwave/webhook

Database
- See supabase/migrations/001_core.sql for tables and RLS policies

Environment
- Copy .env.example to .env.local and set values

Security
- All protected routes use bearer JWT from Supabase
- Webhooks validated by provider signature
- Add a network WAF/rate limiting in production; current limiter is in-memory only

Notes
- Prefer using Supabase client on frontend for auth where possible
- Backoffice/admin endpoints are out of scope for MVP foundation
