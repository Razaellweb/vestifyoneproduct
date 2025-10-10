// stripe.provider.ts
import { PaymentProvider, InitPayment, InitRefund } from "./interface";
import Stripe from "stripe";

export class StripeProvider implements PaymentProvider {
  private stripe: Stripe;

  constructor() {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Stripe API key is required.");
    }
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      // apiVersion: "2023-10-16", // always set a fixed version
    });
  }

  /**
   * Step 1: Initialize payment
   * Here we'll use Checkout Session (good for web)
   */
  async initializePayment(payload: InitPayment) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: payload?.currency?.toLowerCase() as string,
            product_data: {
              name: payload.description || "Payment",
            },
            unit_amount: payload.amount, // amount in cents
          },
          quantity: 1,
        },
      ],
      success_url: payload.callback_url, // where to redirect after payment
      cancel_url: payload.cancel_url,
    });

    return {
      paymentUrl: session.url as string, // redirect user here
      reference: session.id , // store this in DB
    };
  }

  /**
   * Step 2: Verify payment
   * You can poll Stripe or listen for webhook
   */
  async verifyPayment(reference: string) {
    const session = await this.stripe.checkout.sessions.retrieve(reference, {
      expand: ["payment_intent"],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;

    return {
      status: paymentIntent.status, // e.g. "succeeded"
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      provider: "stripe",
    };
  }

  /**
   * Step 3: Refund
   */
  async refundPayment(payload: InitRefund) {
    const refund = await this.stripe.refunds.create({
      payment_intent: payload.transaction, // reference is PaymentIntent ID
      amount: payload.amount, // optional, defaults to full amount
    });

    return {
      status: refund.status as string,
      refundId: refund.id,
    };
  }
}
