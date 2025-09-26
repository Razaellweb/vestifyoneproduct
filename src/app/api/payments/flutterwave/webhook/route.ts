import { NextResponse } from "next/server";
import crypto from "crypto";
import { getServiceClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const secret = process.env.FLW_WEBHOOK_SECRET || process.env.FLW_SECRET_KEY || "";
  const raw = await req.text();
  const signature = req.headers.get("verif-hash") || "";
  if (!signature || signature !== secret) return NextResponse.json({ error: "invalid signature" }, { status: 401 });

  const event = JSON.parse(raw);
  const supabase = getServiceClient();

  if (event?.event === "charge.completed" || event?.data?.status === "successful") {
    const data = event.data;
    await supabase.from("payment_intents").update({ status: "succeeded" }).eq("reference", data.tx_ref);
  }

  return NextResponse.json({ received: true });
}
