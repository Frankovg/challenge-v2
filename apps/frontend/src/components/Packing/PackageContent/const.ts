type HeaderColumn = {
  label: string
  colSpan: number
  align?: 'left' | 'center' | 'right'
}

export const HEADER_COLUMNS: HeaderColumn[] = [
  { label: 'SKU', colSpan: 5 },
  { label: 'Location', colSpan: 3 },
  { label: 'Quantity', colSpan: 3, align: 'center' },
  { label: '', colSpan: 1, align: 'center' },
]
