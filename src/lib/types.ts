export type ServerResponse<T> = { success: boolean; data?: T; error?: any };

export type InvestmentProduct = {
  id: string;
  name: string;
  provider: string;
  category: 'fixed' | 'treasury' | 'mutual' | 'savings';
  minAmount: number;
  rate: number; // annualized
  termMonths: number;
  risk: 'low' | 'medium';
  description: string;
  status?: 'approved' | 'pending';
};

export type SavingsPlanPayload = {
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  startDate: string; // ISO
};

export type LoanEligibility = {
  maxAmount: number;
  apr: number;
  tenureOptions: number[]; // months
};
