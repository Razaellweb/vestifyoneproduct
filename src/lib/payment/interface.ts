

// payment-provider.interface.ts
export interface PaymentProvider {
  /**
   * Initialize a transaction
   */
  initializePayment(payload: InitPayment): Promise<{
    paymentUrl: string;
    reference: string;
  }>;

  /**
   * Verify a transaction
   */
  verifyPayment(reference: string): Promise<{
    status?: string; //"success" | "failed" | "pending";
    amount?: number;
    currency?: string;
    provider?: string;
    metadata?: Record<string, unknown>;
  }>;

  /**
   * Refund a transaction
   */
  refundPayment(paystack: InitRefund): Promise<{
    status: string; // "success" | "failed";
    refundId: string;
  }>;
}

// init payment argument
export interface InitPayment {
  name?: string;
  description?: string;
  email: string;
  reference: string;
  amount: number;
  callback_url?: string;
  cancel_url?: string;
  plan?: string;
  currency?: "NGN" | "USD";
  metadata?: Record<string, unknown>;
}

export interface InitRefund {
  transaction: string;
  amount?: number;
  currency?: "NGN" | "USD" | "GHS" | "ZAR" | "KES";
  customer_note?: string;
  merchant_note?: string;
}
