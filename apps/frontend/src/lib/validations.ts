import { z } from "zod";

export const barcodeSchema = z.object({
  barcode: z
    .string()
    .refine((val) => val === "" || /^[A-Za-z0-9-]+$/.test(val), {
      message: "Invalid barcode format",
    }),
})

export type TBarcode = z.infer<typeof barcodeSchema>;
