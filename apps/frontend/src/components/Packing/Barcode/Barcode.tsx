'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import InputAdornment from "@mui/material/InputAdornment"
import { ScanBarcode } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "components/ui/Button"
import { Input } from "components/ui/Input"
import { useApp } from "hooks/useApp"
import { barcodeSchema, type TBarcode } from "lib/validations"
import { getProductByCode } from "utils/getProductByCode"

import { BarcodeForm } from "./Barcode.styles"

export const Barcode = () => {
  const { lineItems, selectedPackageData, packProduct } = useApp()

  const selectedPackageId = selectedPackageData?.id ?? 0

  const {
    trigger,
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<TBarcode>({
    resolver: zodResolver(barcodeSchema),
    defaultValues: undefined,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async ({ barcode }: TBarcode) => {
    if (!barcode) return;

    const isValid = await trigger("barcode")
    if (!isValid) return

    const product = getProductByCode(lineItems, barcode)
    packProduct(product, selectedPackageId, 1)
    reset()
  }

  return (
    <BarcodeForm onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <Input
          id='barcode'
          variant='outlined'
          size='small'
          color='info'
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <ScanBarcode size={16} />
                </InputAdornment>
              ),
            },
          }}
          {...register("barcode")}
          placeholder="Scan barcode or enter SKU"
        />
        {errors.barcode && (
          <span className="text-error">{errors.barcode.message}</span>
        )}
      </div>
      <Button
        type='submit'
        variant='outlined'
      >
        Search
      </Button>
    </BarcodeForm >
  )
}
