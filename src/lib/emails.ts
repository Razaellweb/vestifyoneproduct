import { Resend } from "resend";

let resend: Resend | null = null;
export function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

export async function sendTransactionalEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const client = getResend();
  if (!client) return { id: null };
  const from = process.env.EMAIL_FROM || "Vestify <no-reply@vestify.one>";
  const { data, error } = await client.emails.send({ from, to, subject, html });
  if (error) throw error;
  return data;
}
