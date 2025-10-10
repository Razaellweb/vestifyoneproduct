export async function sendWhatsApp(to: string, message: string): Promise<{ id: string }> {
  // Integrate WhatsApp provider here using env vars
  console.log("[WHATSAPP]", { to, message });
  return { id: `wa_${Date.now()}` };
}
