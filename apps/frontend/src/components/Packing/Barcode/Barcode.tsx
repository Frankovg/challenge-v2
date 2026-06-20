'use client'

import { type FormEvent, useState } from 'react'

import { Button } from 'components/ui/Button'
import { ScanBarcode } from 'components/ui/icons'
import { Input } from 'components/ui/Input'
import { useApp } from 'hooks/useApp'
import { validateBarcode } from 'lib/validations'
import { getProductByCode } from 'utils/lineItemOperations'

import { BarcodeForm } from './Barcode.styles'

export const Barcode = () => {
  const { lineItems, selectedPackageData, packProduct } = useApp()
  const [barcode, setBarcode] = useState('')
  const [error, setError] = useState<string | null>(null)

  const selectedPackageId = selectedPackageData?.id ?? 0

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const value = barcode.trim()
    if (!value) return

    const validationError = validateBarcode(value)
    if (validationError) {
      setError(validationError)
      return
    }

    const product = getProductByCode(lineItems, value)
    packProduct(product, selectedPackageId, 1)
    setBarcode('')
    setError(null)
  }

  return (
    <BarcodeForm onSubmit={handleSubmit}>
      <div className="input-container">
        <Input
          id="barcode"
          startAdornment={<ScanBarcode size={16} />}
          placeholder="Scan barcode or enter SKU"
          error={!!error}
          value={barcode}
          onChange={(event) => {
            setBarcode(event.target.value)
            if (error) setError(null)
          }}
        />
        {error && <span>{error}</span>}
      </div>
      <Button type="submit" variant="outlined">
        Search
      </Button>
    </BarcodeForm>
  )
}
