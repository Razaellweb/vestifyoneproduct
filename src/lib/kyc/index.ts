import { QoreIdClient } from "@/lib/kyc/quore-id";
import { Env } from "@/lib/env";

export function getQoreId() {
  if (!Env.QOREID_CLIENT_ID || !Env.QOREID_CLIENT_SECRET) {
    throw new Error("QoreID credentials missing");
  }
  return new QoreIdClient({
    clientId: Env.QOREID_CLIENT_ID,
    clientSecret: Env.QOREID_CLIENT_SECRET,
    baseURL: "https://api.qoreid.com",
    debug: process.env.NODE_ENV === "development",
  });
}
