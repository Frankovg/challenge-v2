import { render, screen, renderHook, act } from '@testing-library/react'

import { useLineItems } from 'hooks/useLineItems'
import { LineItemType } from 'types'

import { LineItemsProvider } from '..'

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

    it('allows packing items', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <LineItemsProvider initialLineItems={mockLineItems}>
          {children}
        </LineItemsProvider>
      )

      const { result } = renderHook(() => useLineItems(), { wrapper })

      expect(result.current.lineItems).toHaveLength(2)
      expect(result.current.packages[0].data.line_items).toHaveLength(0)

      act(() => {
        result.current.packItem(mockLineItems[0], 0, 2)
      })

      expect(result.current.lineItems).toHaveLength(1)
      expect(result.current.packages[0].data.line_items).toHaveLength(1)
      expect(result.current.packages[0].data.line_items[0].quantity).toBe(2)
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
      expect(typeof result.current.packItem).toBe('function')
      expect(typeof result.current.unpackItem).toBe('function')
      expect(typeof result.current.updateItemQuantity).toBe('function')
    })
  })

  describe('Package Removal', () => {
    it('does not remove package with items when force is false', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <LineItemsProvider initialLineItems={mockLineItems}>
          {children}
        </LineItemsProvider>
      )

      const { result } = renderHook(() => useLineItems(), { wrapper })

      // Pack an item first
      act(() => {
        result.current.packItem(mockLineItems[0], 0, 2)
      })

      expect(result.current.packages[0].data.line_items).toHaveLength(1)

      // Try to remove package with items without force
      act(() => {
        result.current.removePackage(0, false)
      })

      // Package should still exist (removal blocked)
      expect(result.current.packages[0].data.line_items).toHaveLength(1)
      expect(result.current.lineItems).toHaveLength(1)
    })

    it('removes empty package without force flag', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <LineItemsProvider initialLineItems={mockLineItems}>
          {children}
        </LineItemsProvider>
      )

      const { result } = renderHook(() => useLineItems(), { wrapper })

      // Add a second package
      act(() => {
        result.current.addPackage()
      })

      expect(result.current.packages).toHaveLength(2)

      // Remove empty package (no force needed)
      act(() => {
        result.current.removePackage(1)
      })

      // Package should be removed
      expect(result.current.packages).toHaveLength(1)
    })

    it('removes package and restores items when force is true', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <LineItemsProvider initialLineItems={mockLineItems}>
          {children}
        </LineItemsProvider>
      )

      const { result } = renderHook(() => useLineItems(), { wrapper })

      // Pack an item
      act(() => {
        result.current.packItem(mockLineItems[0], 0, 2)
      })

      expect(result.current.lineItems).toHaveLength(1)
      expect(result.current.packages[0].data.line_items).toHaveLength(1)

      // Remove package with force
      act(() => {
        result.current.removePackage(0, true)
      })

      // Items should be restored
      expect(result.current.lineItems).toHaveLength(2)
      expect(result.current.packages[0].data.line_items).toHaveLength(0)
    })

    it('handles removing last package with items when forced', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <LineItemsProvider initialLineItems={mockLineItems}>
          {children}
        </LineItemsProvider>
      )

      const { result } = renderHook(() => useLineItems(), { wrapper })

      // Pack all items completely
      act(() => {
        result.current.packItem(mockLineItems[0], 0, 2)  // Pack all 2
        result.current.packItem(mockLineItems[1], 0, 5)  // Pack all 5
      })

      expect(result.current.lineItems).toHaveLength(0)
      expect(result.current.packages[0].data.line_items).toHaveLength(2)

      // Force remove the only package
      act(() => {
        result.current.removePackage(0, true)
      })

      // All items should be restored
      expect(result.current.lineItems).toHaveLength(2)
      expect(result.current.packages[0].data.line_items).toHaveLength(0)
    })
  })
})
