// lib/schemas/application.ts
import { z } from "zod";
import { ApplicationStage } from "@prisma/client";

export const createApplicationSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  location: z.string().optional(),
  salary: z.string().optional(),
  jobUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  followUpAt: z.string().optional(), // ISO date string from date input
  notes: z.string().optional(),
});

export const updateApplicationSchema = createApplicationSchema.extend({
  stage: z.nativeEnum(ApplicationStage).optional(),
});

export const updateStageSchema = z.object({
  stage: z.nativeEnum(ApplicationStage),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationInput = z.infer<typeof updateApplicationSchema>;
export type UpdateStageInput = z.infer<typeof updateStageSchema>;
