import { z } from "zod";

export const signupSchema = z.object({ email: z.string().email(), password: z.string().min(8) });
export const signinSchema = z.object({ email: z.string().email(), password: z.string().min(8) });

export const savingsAccountCreateSchema = z.object({ name: z.string().min(1), currency: z.string().default("NGN") });
export const depositSchema = z.object({ accountId: z.string().uuid(), amount: z.number().positive() });

export const loanApplySchema = z.object({ amount: z.number().positive(), termMonths: z.number().int().positive() });

export const groupCreateSchema = z.object({ name: z.string().min(1), contributionAmount: z.number().positive(), frequency: z.enum(["daily","weekly","monthly"]) });
