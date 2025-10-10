import posthog, { PostHog, Properties } from "posthog-js";

export class PostHogClient {
  private enabled: boolean;
  private userId: string;
  private client: PostHog | null;

  constructor(userId?: string) {
    if (
      !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      !process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      throw new Error("Posthog api key and host url are required.");
    }

    this.enabled = Boolean(
      process.env.NEXT_PUBLIC_POSTHOG_KEY &&
        process.env.NEXT_PUBLIC_POSTHOG_HOST
    );
    this.userId = userId ?? "system";

    if (this.enabled) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        autocapture: true,
        capture_pageview: true,
      });
      this.client = posthog;
    } else {
      this.client = null;
    }
  }

  async capture(event: string, props: Properties) {
    if (!this.enabled) {
      console.log(`[PH - noop] ${event}: ${props}`);
      return;
    }

    try {
      if (this.client) {
        this.client.capture(event, props);
      }
    } catch (error) {
      console.log("[PH error]", error);
    }
  }

  async flush() {
    if (this.enabled) {
      try {
        if (this.client) {
          //   this.client.flush()
        }
      } catch (error) {
        console.log("[PH error]", error);
      }
    }
  }
}
