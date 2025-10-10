Vestify One Backend (Next.js App Router)

Overview
- Secure, production-grade backend for a fintech MVP: savings, investments, loans, groups, referrals, wallet, KYC, payments.
- Built with Next.js 15 App Router, TypeScript, Supabase (DB), JWT auth, Paystack payments, QoreID KYC, Resend email, and SMS/WhatsApp stubs.

Auth
- JWT access/refresh tokens (HS256). Include Authorization: Bearer <accessToken> in requests.
- Endpoints: POST /api/v1/auth/signup, /signin, /forgot, /reset, /refresh, /logout

API Endpoints (v1)
- Health/Status: GET /api/health, GET /api/status
- Auth:
  - POST /api/v1/auth/signup { email|phone, password, fullName, acceptTerms, referralCode? }
  - POST /api/v1/auth/signin { emailOrPhone, password }
  - POST /api/v1/auth/forgot { emailOrPhone }
  - POST /api/v1/auth/reset { emailOrPhone, code, newPassword }
  - POST /api/v1/auth/refresh { refreshToken }
  - POST /api/v1/auth/logout
- Users: GET/PUT /api/v1/users/me
- Dashboard: GET /api/v1/dashboard
- KYC: POST /api/v1/kyc/bvn/verify { bvn, firstName, lastName, phone }
- Wallet: GET /api/v1/wallet/balance; POST /api/v1/wallet/topup { amount }
- Payments webhook: POST /api/v1/webhooks/payments (Paystack; expects reference)
- Savings: POST /api/v1/savings { name, amount, interval }; GET /api/v1/savings; GET /api/v1/savings/:id
- Investments: GET /api/v1/investments; GET /api/v1/investments/:id; POST /api/v1/investments/:id/invest { amount }; GET /api/v1/investments/:id/status
- Loans: GET /api/v1/loans; POST /api/v1/loans/apply { amount, interestRate }; GET /api/v1/loans/:id
- Groups: GET /api/v1/groups; POST /api/v1/groups (create or join by inviteCode); GET/POST /api/v1/groups/:id (contribute)
- Referrals: POST /api/v1/referrals/generate; GET /api/v1/referrals/rewards

Security
- Zod validation on all inputs; rate limiting in memory; CORS and security headers in middleware.
- Audit logs for critical actions.
- BVN encrypted at rest using AES-256-GCM (ENCRYPTION_KEY required).

Payments
- Paystack: initiation via /wallet/topup; webhook confirms and credits wallet.

KYC
- QoreID client used for BVN match; user kyc_status updated accordingly.

Database
- Supabase/Postgres schema in src/db/schema.sql. Run this SQL in your database (or create migrations).

Setup
1) Copy .env.example to .env and fill values.
2) Ensure Supabase Postgres has schema from src/db/schema.sql applied.
3) npm install, npm run dev.

Notes
- Replace SMS/WhatsApp stubs with real providers and set env vars.
- Add Flutterwave as optional fallback in src/lib/payment if needed.
- Add Sentry DSN to enable error monitoring.
