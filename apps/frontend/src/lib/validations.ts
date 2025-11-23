import { z } from "zod";

export const barcodeSchema = z.object({
  barcode: z.string().regex(/^[A-Za-z0-9-]+$/
    , "Invalid barcode format")
})

export type TBarcode = z.infer<typeof barcodeSchema>;
