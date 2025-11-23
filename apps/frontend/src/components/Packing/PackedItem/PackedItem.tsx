
import { Trash2 } from "lucide-react"
import { FC, useMemo } from "react"

import { Card } from "components/ui/Card"
import { NumberSpinner } from "components/ui/NumberSpinner"
import { useApp } from "hooks/useApp"
import { LineItemType } from "types"

import { PackedItemContainer } from "./PackedItem.styles"

type Props = {
  item: LineItemType
}

export const PackedItem: FC<Props> = (props) => {
  const { item } = props
  const { lineItems, selectedPackageData, updateItemQuantity } = useApp()

  const maxQuantity = useMemo(() => {
    const unpackedItem = lineItems.find(li => li.id === item.id)
    const unpackedQuantity = unpackedItem?.quantity ?? 0
    return unpackedQuantity === 0 ? item.quantity : (unpackedQuantity + item.quantity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineItems, item.id])

  const handleQuantityChange = (newQuantity: number): void => {
    updateItemQuantity(selectedPackageData.id, item.id, newQuantity)
  }

  return (
    <Card
      content={
        <PackedItemContainer>
          <div className="sku-cell">
            {item.sku}
          </div>
          <div className="location-cell">
            {item.location.toUpperCase()}
          </div>
          <div className="quantity-input">
            <NumberSpinner
              value={item.quantity}
              min={0}
              max={maxQuantity}
              size="small"
              onChange={handleQuantityChange}
              label='Item quantity'
            />
          </div>
          <button
            className="delete-button"
            onClick={() => handleQuantityChange(0)}
          >
            <Trash2
              size={16}
              className="trash-icon"
            />
          </button>
        </PackedItemContainer>
      }
    />
  )
}
