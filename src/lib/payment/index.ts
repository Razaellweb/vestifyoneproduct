import { PaymentService } from "@/lib/payment/service";
import { PaystackProvider } from "@/lib/payment/paystack";
import { Env } from "@/lib/env";

export function getPaymentService(): PaymentService {
  // For now only Paystack is implemented; can add Flutterwave fallback here
  if (!Env.PAYSTACK_SECRET_KEY) {
    throw new Error("PAYSTACK_SECRET_KEY missing");
  }
  return new PaymentService(new PaystackProvider());
}
