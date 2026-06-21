'use client'

import { type FormEvent, useState } from 'react'
import { styled } from 'styled-components'

import { findProductsBySku } from 'app/actions'
import { Button } from 'components/ui/Button'
import { ScanBarcode } from 'components/ui/icons'
import { Input } from 'components/ui/Input'
import { useToast } from 'components/ui/Toast'
import { useApp } from 'contexts/AppContext'
import { validateBarcode } from 'lib/validations'
import { pickAvailableLocation } from 'utils/packageOperations'

const BarcodeForm = styled.form`
  display: flex;
  width: 45vw;
  display: flex;
  align-items: start;
  gap: var(--spacing-xs);

  .input-container {
    width: 100%;
    height: 4rem;

    span {
      font-size: var(--font-size-xs);
      color: var(--status-error-text);
    }
  }
`

export const Barcode = () => {
  const { packages, selectedPackageData, packProduct } = useApp()
  const { add: addToast } = useToast()
  const [barcode, setBarcode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const selectedPackageId = selectedPackageData?.id ?? 0

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault()

    // Guard against double submit (fast scanners / double Enter): two in-flight
    // lookups would both read the same pre-pack `packages` and bypass the
    // availability check.
    if (pending) return

    const value = barcode.trim()
    if (!value) return

    const validationError = validateBarcode(value)
    if (validationError) {
      setError(validationError)
      return
    }

    setPending(true)
    try {
      // Server-side lookup: resolves the SKU to its location records on the
      // server instead of filtering the whole inventory in the browser.
      const locations = await findProductsBySku(value)

      if (locations.length === 0) {
        // Unknown SKU — reuses the provider's "Product not found" toast.
        packProduct(undefined, selectedPackageId, 1)
        setBarcode('')
        setError(null)
        return
      }

      // A SKU spans multiple locations: pick the first one with stock left
      // (drawing down a location, then falling through to the next). The mock
      // doesn't track packed stock, so availability is derived in-memory here;
      // ideally the backend owns inventory-by-location and the pick strategy.
      const target = pickAvailableLocation(locations, packages)

      if (!target) {
        addToast({
          title: 'Out of stock',
          description: `No units of ${value} available to pack.`,
          type: 'error',
        })
        setBarcode('')
        setError(null)
        return
      }

      packProduct(target, selectedPackageId, 1)
      setBarcode('')
      setError(null)
    } catch {
      addToast({
        title: 'Lookup failed',
        description: 'Could not reach the inventory service. Try again.',
        type: 'error',
      })
    } finally {
      setPending(false)
    }
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
      <Button type="submit" variant="outlined" disabled={pending}>
        Search
      </Button>
    </BarcodeForm>
  )
}
