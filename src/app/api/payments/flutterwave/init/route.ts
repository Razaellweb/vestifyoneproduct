import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const userOrRes = await requireUser();
  // @ts-ignore
  if (userOrRes instanceof Response) return userOrRes;
  const user = userOrRes;

  const secret = process.env.FLW_SECRET_KEY;
  if (!secret) return NextResponse.json({ error: "Flutterwave not configured" }, { status: 500 });

  const { amount, email, tx_ref, redirect_url, currency = "NGN" } = await req.json().catch(() => ({}));
  if (!amount || !email) return NextResponse.json({ error: "amount and email required" }, { status: 400 });

  const res = await fetch("https://api.flutterwave.com/v3/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
    body: JSON.stringify({ amount, currency, customer: { email }, tx_ref, redirect_url }),
  });
  const json = await res.json();
  if (!res.ok) return NextResponse.json({ error: json?.message || "flutterwave error" }, { status: 400 });

  const supabase = getServiceClient();
  await supabase.from("payment_intents").insert({ provider: "flutterwave", user_id: user.id, amount: Number(amount), reference: tx_ref || json?.data?.tx_ref, status: "initialized" });

  return NextResponse.json({ data: json.data });
}
