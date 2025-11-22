
import { Trash2 } from "lucide-react"
import { FC, useState } from "react"

import { Card } from "components/ui/Card"
import { NumberSpinner } from "components/ui/NumberSpinner"
import { LineItemType } from "types"

import { PackedItemContainer } from "./PackedItem.styles"

type Props = {
  item: LineItemType
}

export const PackedItem: FC<Props> = (props) => {
  const { item } = props

  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = (newQuantity: number): void => {
    setQuantity(newQuantity)
    // TODO: Update the packed item quantity in the parent component
  }
  console.log("packed ", item);

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
              value={quantity}
              min={0}
              max={item.quantity}
              size="small"
              onChange={handleQuantityChange}
              label='Item quantity'
            />
          </div>
          <div className="actions-column">
            <Trash2 size={16} className="trash-icon" />
          </div>
        </PackedItemContainer>
      }
    />
  )
}
