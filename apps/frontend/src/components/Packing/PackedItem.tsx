import { styled } from 'styled-components'

import { Card } from 'components/ui/Card'
import { Trash2 } from 'components/ui/icons'
import { NumberSpinner } from 'components/ui/NumberSpinner'
import { useApp } from 'contexts/AppContext'
import { LineItemType } from 'types'

const PackedItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);

  .sku-cell {
    grid-column: span 5;
  }

  .location-cell {
    grid-column: span 3;
  }

  .quantity-input {
    grid-column: span 3;
    display: flex;
    justify-content: center;
  }

  .delete-button {
    background-color: transparent;
    border: none;
    grid-column: span 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content
  }

  .trash-icon {
    cursor: pointer;
    transition: color var(--transition-base);

    &:hover {
      color: var(--status-error-text);
    }
  }
`

type Props = {
  item: LineItemType
}

export const PackedItem = (props: Props) => {
  const { item } = props
  const { lineItems, selectedPackageData, updateItemQuantity } = useApp()

  // Cheap derivation (a find + a sum), recomputed every render on purpose.
  // If this were an expensive aggregation over a large list, useMemo would
  // earn its place — here it'd only add a deps array to keep in sync.
  const unpackedItem = lineItems.find((li) => li.id === item.id)
  const unpackedQuantity = unpackedItem?.quantity ?? 0
  const maxQuantity =
    unpackedQuantity === 0 ? item.quantity : unpackedQuantity + item.quantity

  const handleQuantityChange = (newQuantity: number): void => {
    if (!selectedPackageData) return
    updateItemQuantity(selectedPackageData.id, item.id, newQuantity)
  }

  return (
    <Card
      content={
        <PackedItemContainer>
          <div className="sku-cell">{item.sku}</div>
          <div className="location-cell">{item.location.toUpperCase()}</div>
          <div className="quantity-input">
            <NumberSpinner
              value={item.quantity}
              min={0}
              max={maxQuantity}
              onChange={handleQuantityChange}
              label="Item quantity"
            />
          </div>
          <button
            className="delete-button"
            onClick={() => handleQuantityChange(0)}
          >
            <Trash2 size={16} className="trash-icon" />
          </button>
        </PackedItemContainer>
      }
    />
  )
}
