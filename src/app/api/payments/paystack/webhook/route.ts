import { NextResponse } from "next/server";
import crypto from "crypto";
import { getServiceClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const header = process.env.PAYSTACK_WEBHOOK_SECRET || secret || "";

  const raw = await req.text();
  const signature = crypto.createHmac("sha512", header).update(raw).digest("hex");
  const sent = (req.headers.get("x-paystack-signature") || "").trim();
  if (signature !== sent) return NextResponse.json({ error: "invalid signature" }, { status: 401 });

  const event = JSON.parse(raw);
  const supabase = getServiceClient();

  if (event?.event === "charge.success") {
    const data = event.data;
    await supabase.from("payment_intents").update({ status: "succeeded" }).eq("reference", data.reference);
  }

  return NextResponse.json({ received: true });
}
