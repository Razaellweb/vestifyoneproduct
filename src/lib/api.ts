import { MOCK_DATA, API } from './config';
import { ServerResponse, InvestmentProduct, LoanEligibility, SavingsPlanPayload } from './types';
import {
  mockSignup,
  mockSendOtp,
  mockVerifyOtp,
  mockVerifyBvn,
  mockCreateSavingsPlan,
  mockListInvestments,
  mockInvest,
  mockEligibility,
  mockLoanRequest,
} from './mock';

async function http<T>(input: RequestInfo, init?: RequestInit): Promise<ServerResponse<T>> {
  try {
    const res = await fetch(input, { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } });
    const json = await res.json();
    return json as ServerResponse<T>;
  } catch (e) {
    return { success: false, error: e } as ServerResponse<T>;
  }
}

export const Api = {
  async signup(body: { phone: string; password: string }) {
    if (MOCK_DATA) return mockSignup();
    return http<{ userId: string }>(API.signup, { method: 'POST', body: JSON.stringify(body) });
  },
  async sendOtp(body: { phone: string }) {
    if (MOCK_DATA) return mockSendOtp();
    return http<{ token: string }>(API.sendOtp, { method: 'POST', body: JSON.stringify(body) });
  },
  async verifyOtp(code: string) {
    if (MOCK_DATA) return mockVerifyOtp(code) as any;
    // assume verification handled server-side via token in send-otp; for demo return success
    return { success: true } as any;
  },
  async verifyBvn(bvn: string) {
    if (MOCK_DATA) return mockVerifyBvn(bvn) as any;
    return http<{ verified: boolean; maskedName?: string }>(API.verifyBvn, { method: 'POST', body: JSON.stringify({ bvn }) });
  },
  async createSavingsPlan(payload: SavingsPlanPayload) {
    if (MOCK_DATA) return mockCreateSavingsPlan(payload) as any;
    return http(API.savingsPlan, { method: 'POST', body: JSON.stringify(payload) });
  },
  async listInvestments() {
    if (MOCK_DATA) return mockListInvestments() as any;
    return http<{ items: InvestmentProduct[] }>(API.investments);
  },
  async invest(productId: string, amount: number) {
    if (MOCK_DATA) return mockInvest(productId, amount) as any;
    return http(API.invest, { method: 'POST', body: JSON.stringify({ productId, amount }) });
  },
  async loanEligibility() {
    if (MOCK_DATA) return mockEligibility() as any;
    return http<LoanEligibility>(API.loanEligibility);
  },
  async requestLoan(amount: number, tenure: number) {
    if (MOCK_DATA) return mockLoanRequest(amount, tenure) as any;
    return http(API.loanRequest, { method: 'POST', body: JSON.stringify({ amount, tenure }) });
  },
};
