import { z } from "zod";

export const contactSchema = z.object({
  title: z
    .string()
    .min(4, "Title should be string and must be at least 4 characters."),
  description: z
    .string()
    .min(100, "Description must be at least 100 characters."),
  content: z.string().min(500, "content must be at least 500+ characters."),
});
