/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

import { z } from "zod";

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Analytics Event Schema
 */
export const AnalyticsEventSchema = z.object({
  event: z.string().min(1),
  data: z.record(z.any()).optional(),
});

export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;

/**
 * Contact Request Schema
 */
export const ContactRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(1),
});

export type ContactRequest = z.infer<typeof ContactRequestSchema>;
