export const IS_BROWSER = typeof window !== 'undefined';
export const MOCK_DATA = (process.env.NEXT_PUBLIC_MOCK_DATA ?? process.env.MOCK_DATA ?? 'true').toString() === 'true';
export const API = {
  signup: '/api/auth/signup',
  sendOtp: '/api/auth/send-otp',
  verifyBvn: '/api/auth/bvn-verify',
  savingsPlan: '/api/savings/plans',
  investments: '/api/investments',
  invest: '/api/investments/invest',
  loanEligibility: '/api/loans/eligibility',
  loanRequest: '/api/loans/request',
};
