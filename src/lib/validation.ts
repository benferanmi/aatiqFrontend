import { z } from "zod";

export const enquirySchema = z.object({
  firstName: z.string().trim().min(2, "Required").max(50, "Too long"),
  lastName: z.string().trim().min(2, "Required").max(50, "Too long"),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Required")
    .max(30)
    .regex(/^[\d+\s\-()]+$/, "Invalid phone"),
  address: z.string().trim().max(200).optional().default(""),
  message: z
    .string()
    .trim()
    .min(10, "At least 10 characters")
    .max(2000, "Too long"),
  productId: z.string().optional().default(""),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryOutput = z.output<typeof enquirySchema>;
