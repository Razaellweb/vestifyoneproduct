import { z } from 'zod'

export const signupSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  password: z.string().min(8),
  acceptTerms: z.boolean().refine(v => v === true, 'Terms must be accepted')
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export const otpSchema = z.object({
  phone: z.string().min(10).max(20),
  purpose: z.enum(['signup','login','bvn_verify'])
})

export const bvnSchema = z.object({
  bvn: z.string().regex(/^\d{11}$/),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  phone: z.string().min(10).max(20).optional(),
  email: z.string().email().optional()
})

export const savingsPlanSchema = z.object({
  name: z.string().min(1),
  amount: z.number().positive(),
  frequency: z.enum(['daily','weekly','monthly']),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  autoDebit: z.boolean().default(true)
})

export const investSchema = z.object({
  productId: z.string().uuid(),
  amount: z.number().positive()
})

export const loanRequestSchema = z.object({
  amount: z.number().positive(),
  bankCode: z.string().min(2),
  accountNumber: z.string().min(10),
  accountName: z.string().min(3)
})
