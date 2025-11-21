
import { Trash2 } from "lucide-react"
import { FC } from "react"

import { Card } from "components/ui/Card"
import { LineItemType } from "types"

import { PackedItemContainer } from "./PackedItem.styles"

type Props = {
  item: LineItemType
}

export const PackedItem: FC<Props> = (props) => {
  const { item } = props
  return (
    <Card
      content={
        <PackedItemContainer>
          <div className="sku-column">
            {item.sku}
          </div>
          <div className="location-column">
            {item.location}
          </div>
          <div className="quantity-column">
            <></>
          </div>
          <div className="actions-column">
            <Trash2 size={16} className="trash-icon" />
          </div>
        </PackedItemContainer>
      }
    />
  )
}
