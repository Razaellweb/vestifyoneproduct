export interface InitPayment {
  email: string
  reference: string
  amount: number
  callback_url?: string
  cancel_url?: string
  currency?: 'NGN'|'USD'
  metadata?: Record<string, unknown>
  plan?: string
}
