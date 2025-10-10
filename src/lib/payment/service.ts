// payment.service.ts
import { PaymentProvider, InitPayment, InitRefund } from "./interface";

export class PaymentService {
  constructor(private provider: PaymentProvider) {}

  async checkout(payload: InitPayment) {
    return this.provider.initializePayment(payload);
  }

  async confirm(reference: string) {
    return this.provider.verifyPayment(reference);
  }

  async refund(payload: InitRefund) {
    return this.provider.refundPayment(payload);
  }
}

// use case
// const paystack = new PaymentService(new PaystackProvider());
// const stripe = new PaymentService(new StripeProvider());