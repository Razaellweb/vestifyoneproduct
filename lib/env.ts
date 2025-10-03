import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(10),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(10),
  JWT_SECRET: z.string().min(16),
  ENCRYPTION_KEY: z.string().min(32),
  PAYSTACK_SECRET_KEY: z.string().optional(),
  FLUTTERWAVE_SECRET_KEY: z.string().optional(),
  RESEND_KEY: z.string().optional(),
  SMS_PROVIDER: z.enum(['termii','twilio']).optional(),
  TERMII_API_KEY: z.string().optional(),
  TERMII_SENDER_ID: z.string().optional(),
  QOREID_CLIENT_ID: z.string().optional(),
  QOREID_CLIENT_SECRET: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>

export const getEnv = (): Env => {
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    const formatted = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ')
    throw new Error('Invalid environment configuration: ' + formatted)
  }
  return parsed.data
}
