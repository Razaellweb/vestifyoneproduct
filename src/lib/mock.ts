import { InvestmentProduct, LoanEligibility, SavingsPlanPayload } from './types';
import { sleep } from './utils';

export const mockInvestments: InvestmentProduct[] = [
  {
    id: 't-bill-182',
    name: 'FGN Treasury Bills (182d)',
    provider: 'CBN Auction',
    category: 'treasury',
    minAmount: 5000,
    rate: 15.5,
    termMonths: 6,
    risk: 'low',
    description: 'Government-backed short-term bills. Auto-rollover optional.',
    status: 'approved',
  },
  {
    id: 'agri-notes',
    name: 'Agri Notes Series II',
    provider: 'Vestify Partners',
    category: 'fixed',
    minAmount: 10000,
    rate: 18.0,
    termMonths: 9,
    risk: 'low',
    description: 'Asset-backed notes with conservative exposure to agro value chain.',
    status: 'approved',
  },
  {
    id: 'money-market',
    name: 'Money Market Fund',
    provider: 'Alpha AM',
    category: 'mutual',
    minAmount: 2000,
    rate: 13.2,
    termMonths: 1,
    risk: 'low',
    description: 'Liquid fund targeting T-bills and commercial papers.',
    status: 'approved',
  },
];

export async function mockSignup() {
  await sleep(500);
  return { success: true, data: { userId: 'mock-user', phone: '+234...' } };
}

export async function mockSendOtp() {
  await sleep(600);
  return { success: true, data: { token: 'mock-otp-token', ttl: 120 } };
}

export async function mockVerifyOtp(code: string) {
  await sleep(500);
  return { success: code === '123456' };
}

export async function mockVerifyBvn(bvn: string) {
  await sleep(800);
  const ok = /^\d{11}$/.test(bvn);
  return { success: ok, data: { verified: ok, maskedName: ok ? 'A*** O******' : undefined } };
}

export async function mockCreateSavingsPlan(payload: SavingsPlanPayload) {
  await sleep(700);
  return { success: true, data: { id: 'plan_1', ...payload, status: 'active' } };
}

export async function mockListInvestments() {
  await sleep(700);
  return { success: true, data: { items: mockInvestments } };
}

export async function mockInvest(productId: string, amount: number) {
  await sleep(900);
  return { success: true, data: { id: 'inv_' + productId, amount, status: 'active' } };
}

export async function mockEligibility(): Promise<{ success: boolean; data: LoanEligibility }>{
  await sleep(500);
  return { success: true, data: { maxAmount: 336400, apr: 22.5, tenureOptions: [1, 3, 6] } };
}

export async function mockLoanRequest(amount: number, tenure: number) {
  await sleep(900);
  const approved = amount <= 336400;
  return { success: approved, data: approved ? { id: 'loan_1', amount, tenure, status: 'active' } : undefined, error: approved ? undefined : { message: 'Exceeds eligibility' } };
}
