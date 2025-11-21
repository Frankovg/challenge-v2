type HeaderColumn = {
  label: string
  colSpan: number
  align?: 'left' | 'center' | 'right'
}

export const HEADER_COLUMNS: HeaderColumn[] = [
  { label: 'Name', colSpan: 5 },
  { label: 'SKU', colSpan: 3 },
  { label: 'Quantity', colSpan: 2, align: 'center' },
  { label: '', colSpan: 2, align: 'center' },
]
