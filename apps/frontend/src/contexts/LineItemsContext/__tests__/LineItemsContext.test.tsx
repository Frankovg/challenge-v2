import { render, screen, renderHook, act } from '@testing-library/react'

import { LineItemType } from 'types'

import { LineItemsProvider, useLineItems } from '..'

const mockLineItems: LineItemType[] = [
  { id: 1, quantity: 2, sku: 'SKU-001', location: 'A1' },
  { id: 2, quantity: 5, sku: 'SKU-002', location: 'B2' },
]

describe('LineItemsContext', () => {
  describe('LineItemsProvider', () => {
    it('provides line items to children', () => {
      const TestComponent = () => {
        const { lineItems } = useLineItems()
        return (
          <div>
            {lineItems.map((item) => (
              <div key={item.id} data-testid={`item-${item.id}`}>
                {item.sku}
              </div>
            ))}
          </div>
        )
      }

      render(
        <LineItemsProvider initialLineItems={mockLineItems}>
          <TestComponent />
        </LineItemsProvider>
      )

      expect(screen.getByTestId('item-1')).toHaveTextContent('SKU-001')
      expect(screen.getByTestId('item-2')).toHaveTextContent('SKU-002')
    })

    it('allows updating line items via setLineItems', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <LineItemsProvider initialLineItems={mockLineItems}>
          {children}
        </LineItemsProvider>
      )

      const { result } = renderHook(() => useLineItems(), { wrapper })

      expect(result.current.lineItems).toHaveLength(2)

      const newLineItems: LineItemType[] = [
        { id: 3, quantity: 1, sku: 'SKU-003', location: 'C3' },
      ]

      act(() => {
        result.current.setLineItems(newLineItems)
      })

      expect(result.current.lineItems).toHaveLength(1)
      expect(result.current.lineItems[0].sku).toBe('SKU-003')
    })
  })

  describe('useLineItems', () => {
    it('throws error when used outside of provider', () => {
      // Suppress console.error for this test
      const originalError = console.error
      console.error = jest.fn()

      expect(() => {
        renderHook(() => useLineItems())
      }).toThrow('useLineItems must be used within a LineItemsProvider')

      console.error = originalError
    })

    it('returns context value when used inside provider', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <LineItemsProvider initialLineItems={mockLineItems}>
          {children}
        </LineItemsProvider>
      )

      const { result } = renderHook(() => useLineItems(), { wrapper })

      expect(result.current.lineItems).toEqual(mockLineItems)
      expect(typeof result.current.setLineItems).toBe('function')
    })
  })
})
