import { SavingsPlan, Txn } from "./types";

export const USE_MOCK = true;

export const mockBalances = {
  wallet: 205000,
  savings: 420500,
  investments: 88000,
  loanOutstanding: 0,
};

export const mockSavingsHistory: { label: string; value: number }[] = [
  { label: "Jan", value: 12 },
  { label: "Feb", value: 14 },
  { label: "Mar", value: 18 },
  { label: "Apr", value: 21 },
  { label: "May", value: 26 },
  { label: "Jun", value: 28 },
  { label: "Jul", value: 33 },
  { label: "Aug", value: 38 },
  { label: "Sep", value: 44 },
  { label: "Oct", value: 48 },
  { label: "Nov", value: 53 },
  { label: "Dec", value: 60 },
];

export const mockTxns: Txn[] = [
  { id: "t1", type: "credit", amount: 2000, note: "Ajo circle", time: "Today" },
  { id: "t2", type: "credit", amount: 5000, note: "Auto‑debit", time: "Yesterday" },
  { id: "t3", type: "debit", amount: 1500, note: "Transfer", time: "2 days ago" },
];

export function delay(ms: number) { return new Promise(res => setTimeout(res, ms)); }

export async function fetchDashboard() {
  await delay(350);
  if (Math.random() < 0.05) throw new Error("Network error");
  return { balances: mockBalances, history: mockSavingsHistory, txns: mockTxns };
}

export async function fetchSavingsPlanProjection(plan: SavingsPlan) {
  await delay(300);
  const months = 12;
  const values = Array.from({ length: months }, (_, i) => ({ label: `${i+1}`, value: plan.amount * (i+1) }));
  return values;
}

export async function fetchLoanEligibility(savings: number) {
  await delay(250);
  const max = Math.floor(savings * 0.8);
  return { eligible: savings > 20000, max };
}

export async function simulateMandate() {
  await delay(500);
  return { status: Math.random() > 0.2 ? "active" : "failed" } as const;
}

export function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);
}
