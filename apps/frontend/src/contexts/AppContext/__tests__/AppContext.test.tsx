import { render, screen, renderHook, act } from '@testing-library/react'

import { useApp } from 'hooks/useApp'
import { LineItemType } from 'types'

import { LineItemsProvider } from '..'

jest.mock('components/ui/Toast', () => ({
  useToast: () => ({ add: jest.fn(), remove: jest.fn(), toasts: [] }),
}))

jest.mock('hooks/usePackItemsMutation', () => ({
  usePackItemsMutation: jest.fn(() => ({
    packItems: jest.fn(),
    error: null,
  })),
}))

const mockLineItems: LineItemType[] = [
  { id: 1, quantity: 2, sku: 'SKU-001', location: 'A1' },
  { id: 2, quantity: 5, sku: 'SKU-002', location: 'B2' },
]

describe('AppContext', () => {
  describe('LineItemsProvider', () => {
    it('provides line items to children', () => {
      const TestComponent = () => {
        const { lineItems } = useApp()
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
        </LineItemsProvider>,
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

      const { result } = renderHook(() => useApp(), { wrapper })

      expect(result.current.lineItems).toHaveLength(2)
      expect(result.current.packages[0].data.line_items).toHaveLength(0)

      act(() => {
        result.current.packProduct(mockLineItems[0], 0, 2)
      })

      expect(result.current.lineItems).toHaveLength(1)
      expect(result.current.packages[0].data.line_items).toHaveLength(1)
      expect(result.current.packages[0].data.line_items[0].quantity).toBe(2)
    })
  })

  describe('useApp', () => {
    it('throws error when used outside of provider', () => {
      const originalError = console.error
      console.error = jest.fn()

      expect(() => {
        renderHook(() => useApp())
      }).toThrow('useLineItems must be used within a LineItemsProvider')

      console.error = originalError
    })

    it('returns context value when used inside provider', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <LineItemsProvider initialLineItems={mockLineItems}>
          {children}
        </LineItemsProvider>
      )

      const { result } = renderHook(() => useApp(), { wrapper })

      expect(result.current.lineItems).toEqual(mockLineItems)
      expect(typeof result.current.packProduct).toBe('function')
      expect(typeof result.current.updateItemQuantity).toBe('function')
      expect(typeof result.current.addPackage).toBe('function')
      expect(typeof result.current.removePackage).toBe('function')
    })
  })

  describe('Package Removal', () => {
    it('does not remove package with items when force is false', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <LineItemsProvider initialLineItems={mockLineItems}>
          {children}
        </LineItemsProvider>
      )

      const { result } = renderHook(() => useApp(), { wrapper })

      act(() => {
        result.current.packProduct(mockLineItems[0], 0, 2)
      })

      expect(result.current.packages[0].data.line_items).toHaveLength(1)

      act(() => {
        result.current.removePackage(0, false)
      })

      expect(result.current.packages[0].data.line_items).toHaveLength(1)
      expect(result.current.lineItems).toHaveLength(1)
    })

    it('removes empty package without force flag', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <LineItemsProvider initialLineItems={mockLineItems}>
          {children}
        </LineItemsProvider>
      )

      const { result } = renderHook(() => useApp(), { wrapper })

      act(() => {
        result.current.addPackage()
      })

      expect(result.current.packages).toHaveLength(2)

      act(() => {
        result.current.removePackage(1)
      })

      expect(result.current.packages).toHaveLength(1)
    })

    it('removes package and restores items when force is true', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <LineItemsProvider initialLineItems={mockLineItems}>
          {children}
        </LineItemsProvider>
      )

      const { result } = renderHook(() => useApp(), { wrapper })

      act(() => {
        result.current.packProduct(mockLineItems[0], 0, 2)
      })

      expect(result.current.lineItems).toHaveLength(1)
      expect(result.current.packages[0].data.line_items).toHaveLength(1)

      act(() => {
        result.current.removePackage(0, true)
      })

      expect(result.current.lineItems).toHaveLength(2)
      expect(result.current.packages[0].data.line_items).toHaveLength(0)
    })

    it('handles removing last package with items when forced', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <LineItemsProvider initialLineItems={mockLineItems}>
          {children}
        </LineItemsProvider>
      )

      const { result } = renderHook(() => useApp(), { wrapper })

      act(() => {
        result.current.packProduct(mockLineItems[0], 0, 2)
        result.current.packProduct(mockLineItems[1], 0, 5)
      })

      expect(result.current.lineItems).toHaveLength(0)
      expect(result.current.packages[0].data.line_items).toHaveLength(2)

      act(() => {
        result.current.removePackage(0, true)
      })

      expect(result.current.lineItems).toHaveLength(2)
      expect(result.current.packages[0].data.line_items).toHaveLength(0)
    })
  })

  describe('updateItemQuantity', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LineItemsProvider initialLineItems={mockLineItems}>
        {children}
      </LineItemsProvider>
    )

    it('returns the difference to the unpacked list when a packed quantity is reduced', () => {
      const { result } = renderHook(() => useApp(), { wrapper })

      act(() => {
        result.current.packProduct(mockLineItems[0], 0, 2)
      })

      // id 1 is fully packed, so only id 2 remains unpacked
      expect(result.current.lineItems.find((li) => li.id === 1)).toBeUndefined()

      act(() => {
        result.current.updateItemQuantity(0, 1, 1)
      })

      expect(result.current.packages[0].data.line_items[0].quantity).toBe(1)
      expect(result.current.lineItems.find((li) => li.id === 1)?.quantity).toBe(
        1,
      )
    })

    it('unpacks the item and restores its full quantity when set to 0', () => {
      const { result } = renderHook(() => useApp(), { wrapper })

      act(() => {
        result.current.packProduct(mockLineItems[0], 0, 2)
      })

      act(() => {
        result.current.updateItemQuantity(0, 1, 0)
      })

      expect(result.current.packages[0].data.line_items).toHaveLength(0)
      expect(result.current.lineItems.find((li) => li.id === 1)?.quantity).toBe(
        2,
      )
    })

    it('ignores updates for an item that is not in the package', () => {
      const { result } = renderHook(() => useApp(), { wrapper })

      act(() => {
        result.current.updateItemQuantity(0, 999, 1)
      })

      expect(result.current.packages[0].data.line_items).toHaveLength(0)
      expect(result.current.lineItems).toHaveLength(2)
    })
  })
})
