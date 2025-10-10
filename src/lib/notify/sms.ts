export async function sendSms(to: string, message: string): Promise<{ id: string }> {
  // Integrate your SMS provider here using env vars
  console.log("[SMS]", { to, message });
  return { id: `sms_${Date.now()}` };
}
