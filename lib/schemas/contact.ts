// lib/schemas/contact.ts
import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  email: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  notes: z.string().optional(),
  applicationId: z.string().min(1, "Application ID is required"),
});

export const updateContactSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  role: z.string().optional(),
  email: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateContactInput = z.infer<typeof updateContactSchema>;
