// Copied & adapted from template
import { InitPayment } from './types'
import PayStackSDK from 'paystack-sdk'

export class PaystackProvider {
  private paystack: PayStackSDK.Paystack
  constructor() {
    if (!process.env.PAYSTACK_SECRET_KEY) throw new Error('Paystack API key is required.')
    this.paystack = new PayStackSDK.Paystack(process.env.PAYSTACK_SECRET_KEY)
  }
  async initializePayment(payload: InitPayment) {
    const req = { ...payload, amount: String(Math.ceil(payload.amount) * 100) }
    const transaction = await this.paystack.transaction.initialize(req)
    if (!transaction.status) throw new Error(transaction.message)
    return {
      paymentUrl: transaction.data?.authorization_url as string,
      reference: transaction.data?.reference as string,
    }
  }
  async verifyPayment(reference: string) {
    const transaction = await this.paystack.transaction.verify(reference)
    if (!transaction.status) throw new Error(transaction.message)
    return {
      status: transaction.data?.status as string,
      amount: transaction.data?.amount as number,
      currency: transaction.data?.currency as string,
      provider: 'paystack',
      metadata: transaction.data?.metadata,
    }
  }
}
