const BARCODE_PATTERN = /^[A-Za-z0-9-]+$/
const MAX_BARCODE_LENGTH = 50

/**
 * Validates a barcode/SKU. Returns an error message, or null when valid.
 * An empty string is treated as valid here; callers no-op on empty submit.
 */
export const validateBarcode = (value: string): string | null => {
  const trimmed = value.trim()
  if (!trimmed) return null
  if (trimmed.length > MAX_BARCODE_LENGTH) {
    return 'Barcode must be less than 50 characters'
  }
  if (!BARCODE_PATTERN.test(trimmed)) {
    return 'Invalid barcode format'
  }
  return null
}
