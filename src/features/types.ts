export type Txn = { id: string; type: "debit" | "credit"; amount: number; note: string; time: string };
export type SavingsPlan = { amount: number; frequency: "daily" | "weekly" | "monthly"; startDate: string };
