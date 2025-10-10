// paystack.provider.ts
import { PaymentProvider, InitPayment, InitRefund } from "./interface";
import PayStackSDK from "paystack-sdk";

export class PaystackProvider implements PaymentProvider {
  constructor() {
    if (!process.env.PAYSTACK_SECRET_KEY) {
      throw new Error("Paystack API key is required.");
    }

  }
  private paystack = new PayStackSDK.Paystack(
    process.env.PAYSTACK_SECRET_KEY as string
  );

  async initializePayment(payload: InitPayment) {
    const req = {
      ...payload,
      amount: String(Math.ceil(payload.amount) * 100),
    };
    console.log("Paystack body:", payload);
    const transaction = await this.paystack.transaction.initialize(req);
    if (!transaction.status) throw new Error(transaction.message);
    console.log("Init payment response", transaction);
    return {
      paymentUrl: transaction.data?.authorization_url as string,
      reference: transaction.data?.reference as string,
    };
  }

  async verifyPayment(reference: string) {
    // Verify via Paystack
    console.log("check charge reference", reference);
    const transaction = await this.paystack.transaction.verify(reference);
    if (!transaction.status) {
      console.log("Charge Error", transaction);
      throw new Error(transaction.message);
    }
    return {
      status: transaction.data?.status as string,
      amount: transaction.data?.amount as number,
      currency: transaction.data?.currency as string,
      provider: "paystack",
      metadata: transaction.data?.metadata,
    };
  }

  async refundPayment(payload: InitRefund) {
    console.log("refund payload", payload);
    const transaction = await this.paystack.refund.create(payload);
    if (!transaction.status) throw new Error(transaction.message);
    console.log("refund Error", transaction);
    return {
      status: transaction.data?.status as string,
      refundId: transaction.data?.id?.toString() as string,
    };
  }
}
