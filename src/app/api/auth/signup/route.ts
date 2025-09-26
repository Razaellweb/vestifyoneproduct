import { NextResponse } from "next/server";
import { z } from "zod";
import { getServiceClient } from "@/lib/supabase-server";
import { capture } from "@/lib/analytics";

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const { email, password } = parsed.data;
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    capture("signup_started", { email });
    return NextResponse.json({ userId: data.user?.id }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Internal error" }, { status: 500 });
  }
}
