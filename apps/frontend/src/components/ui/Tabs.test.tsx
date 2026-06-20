import { render, screen } from '@testing-library/react'

import { Tabs } from './Tabs'
import { mockPackedItems } from './Tabs.mocks'

test('renders tabs with correct quantities', () => {
  render(<Tabs tabs={mockPackedItems} value={0} onChange={jest.fn()} />)

  expect(screen.getByText('Package 1')).toBeInTheDocument()
  expect(screen.getByText('Package 2')).toBeInTheDocument()
  expect(screen.getByText('Package 3')).toBeInTheDocument()

  // Quantities
  expect(screen.getByText('2')).toBeInTheDocument()
  expect(screen.getByText('0')).toBeInTheDocument()
  expect(screen.getByText('1')).toBeInTheDocument()
})
