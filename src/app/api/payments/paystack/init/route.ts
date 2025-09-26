import { NextResponse } from "next/server";
import crypto from "crypto";
import { getServiceClient } from "@/lib/supabase-server";
import { requireUser } from "@/lib/auth";

export async function POST(req: Request) {
  const userOrRes = await requireUser();
  // @ts-ignore
  if (userOrRes instanceof Response) return userOrRes;
  const user = userOrRes;

  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return NextResponse.json({ error: "Paystack not configured" }, { status: 500 });

  const { amount, email, reference, callback_url } = await req.json().catch(() => ({}));
  if (!amount || !email) return NextResponse.json({ error: "amount and email required" }, { status: 400 });

  const initRes = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
    body: JSON.stringify({ amount: Math.round(Number(amount) * 100), email, reference, callback_url }),
  });
  const json = await initRes.json();
  if (!initRes.ok) return NextResponse.json({ error: json?.message || "paystack error" }, { status: 400 });

  const supabase = getServiceClient();
  await supabase.from("payment_intents").insert({ provider: "paystack", user_id: user.id, amount: Number(amount), reference: reference || json?.data?.reference, status: "initialized" });

  return NextResponse.json({ data: json.data });
}
