import PostHog from "posthog-node";

let client: PostHog | null = null;
export function getPosthog() {
  if (!process.env.POSTHOG_API_KEY) return null;
  if (!client) {
    client = new PostHog(process.env.POSTHOG_API_KEY!, { host: process.env.POSTHOG_HOST || "https://us.i.posthog.com" });
  }
  return client;
}

export function capture(event: string, properties?: Record<string, any>, distinctId?: string) {
  const ph = getPosthog();
  if (!ph) return;
  ph.capture({ event, properties, distinctId: distinctId || "anonymous" });
}
