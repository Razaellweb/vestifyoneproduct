Vestify One Frontend (Dashboard + Auth)

Key routes
- /dashboard (overview)
- /dashboard/savings (summary)
- /dashboard/savings/setup, /payment, /success
- /dashboard/invest (marketplace)
- /dashboard/invest/details/[id] -> /confirm/[id] -> /success
- /dashboard/loans (summary) -> /loans/apply -> /loans/success
- /dashboard/groups (list) -> /groups/create -> /groups/[id]
- /dashboard/referrals
- /dashboard/settings
- /dashboard/kyc/bvn
- /signup, /signin, /reset/request, /reset/verify, /reset/new

Design
- Mobile-first grid, brand gradients, lucide icons
- Recharts on every page for visual analytics
- Dark/light via CSS variables (toggle ready)
- Marketing Navbar/Footer hidden on dashboard/auth via ShellSwitch

Error + empty states
- src/features/ui/ErrorState.tsx, EmptyState.tsx

Next steps
- Wire API calls to /api/v1 endpoints
- Add loading and optimistic states with React Query if needed
