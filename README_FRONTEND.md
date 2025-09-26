Vestify One Frontend

Commands
- npm install
- npm run dev

Environment
- NEXT_PUBLIC_MOCK_DATA=true to use mock data in dashboards and forms

Routes
- /                            Landing
- /signup, /login              Auth
- /dashboard                   App shell (sidebar + header)
- /dashboard/savings           Savings accounts + quick deposit
- /dashboard/loans             Loan apply form
- /dashboard/groups            Create group
- /dashboard/investments       Coming soon
- /dashboard/settings          Settings

Notes
- Dashboard UI reuses remixed components based on the template repository
- Styling follows landing page tokens mapped to CSS variables for sidebar/cards/charts
- All network calls go to Next API routes; set MOCK mode to avoid live calls.
