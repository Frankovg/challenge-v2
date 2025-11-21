
import { FC } from "react"

import { Card } from "components/ui/Card"
import { CardButton } from "components/ui/CardButton"
import { LineItemType } from "types"

import { ItemName } from "../ItemName"

import { UnpackedItemContainer } from "./UnpackedItem.styles"

type Props = {
  item: LineItemType
}

export const UnpackedItem: FC<Props> = (props) => {
  const { item } = props
  return (
    <Card
      content={
        <UnpackedItemContainer>
          <ItemName
            item={{
              sku: item.sku,
              location: item.location
            }}
          />
          <div className="actions-container">
            <div className="quantity-container">
              {item.quantity}
            </div>
            <CardButton >+1</CardButton>
            <CardButton >All</CardButton>
          </div>
        </UnpackedItemContainer>
      }
    />
  )
}
