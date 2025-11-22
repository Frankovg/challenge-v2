
import { Trash2 } from "lucide-react"
import { FC, useMemo } from "react"

import { Card } from "components/ui/Card"
import { NumberSpinner } from "components/ui/NumberSpinner"
import { useLineItems } from "hooks/useLineItems"
import { LineItemType } from "types"

import { PackedItemContainer } from "./PackedItem.styles"

type Props = {
  item: LineItemType
}

export const PackedItem: FC<Props> = (props) => {
  const { item } = props
  const { lineItems, selectedPackageData, updateItemQuantity } = useLineItems()

  const maxQuantity = useMemo(() => {
    const unpackedItem = lineItems.find(li => li.id === item.id)
    const unpackedQuantity = unpackedItem?.quantity ?? 0
    return unpackedQuantity === 0 ? item.quantity : (unpackedQuantity + item.quantity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineItems, item.id])

  const handleQuantityChange = (newQuantity: number): void => {
    updateItemQuantity(selectedPackageData.id, item.id, newQuantity)
  }

  const handleRemove = (): void => {
    updateItemQuantity(selectedPackageData.id, item.id, 0)
  }

  return (
    <Card
      content={
        <PackedItemContainer>
          <div className="sku-column">
            {item.sku}
          </div>
          <div className="location-column">
            {item.location.toUpperCase()}
          </div>
          <div className="quantity-column">
            <NumberSpinner
              value={item.quantity}
              min={0}
              max={maxQuantity}
              size="small"
              onChange={handleQuantityChange}
              label='Item quantity'
            />
          </div>
          <div className="actions-column">
            <Trash2
              size={16}
              className="trash-icon"
              onClick={handleRemove}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </PackedItemContainer>
      }
    />
  )
}
