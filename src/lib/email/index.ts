import { Resend, CreateEmailOptions } from "resend";
import path from "path";
import fs from "fs/promises";
import Handlebars from "handlebars";
/* eslint-disable  @typescript-eslint/no-explicit-any */

type MailOptions = {
  to: string;
  subject: string;
  template: string;
  context?: Record<string, any>;
} & Omit<CreateEmailOptions, "html" | "text">;

export class Mailer {
  constructor() {
    if (!process.env.RESEND_KEY) {
      throw new Error("Resend api key is required.");
    }
  }
  private resend = new Resend(process.env.RESEND_KEY);
  private templatesDir = path.resolve(process.cwd(), "public/templates");

  /**
   * Compiles a Handlebars template with provided context
   * @param file - Template file name (without extension)
   * @param context - Data to pass to the template
   * @returns Compiled HTML string
   */
  async compileTemplate(
    file: string,
    context: Record<string, any> = {}
  ): Promise<string> {
    const templatePath = path.join(this.templatesDir, `${file}.hbs`);

    try {
      const exists = await fs
        .stat(templatePath)
        .then(() => true)
        .catch(() => false);
      if (!exists) {
        throw new Error(`Template file not found at ${templatePath}`);
      }

      const templateSource = await fs.readFile(templatePath, "utf8");
      const template = Handlebars.compile(templateSource);
      return template(context);
    } catch (error: any) {
      console.error(`[Mailer] Template Error (${file}):`, error.message);
      throw new Error(`Failed to compile template '${file}': ${error.message}`);
    }
  }

  /**
   * Sends an email using a template
   * @param options - Mail options including template name and context
   * @returns Response from Resend API
   */
  async sendEmail(options: MailOptions) {
    const { to, subject, template, context, from, ...restOptions } = options;

    // Compile the template
    const html = await this.compileTemplate(template, context);
    console.log(html);

    // Send the email
    return this.resend.emails.send({
      ...restOptions,
      from, // You can set a default
      to,
      subject,
      html,
    });
  }
}
