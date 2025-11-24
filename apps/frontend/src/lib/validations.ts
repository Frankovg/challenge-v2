import { z } from "zod";

export const barcodeSchema = z.object({
  barcode: z
    .string()
    .max(50, { message: "Barcode must be less than 50 characters" })
    .refine((val) => val === "" || /^[A-Za-z0-9-]+$/.test(val), {
      message: "Invalid barcode format",
    })
    .transform(val => val.trim()),
})

export type TBarcode = z.infer<typeof barcodeSchema>;
