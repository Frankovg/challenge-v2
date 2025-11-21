
import { FC } from "react"

import { Card } from "components/ui/Card"
import { CardButton } from "components/ui/CardButton"
import { LineItemType } from "types"

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
          <div className='item-name-container'>
            <p>{item.sku}</p>
            <span>{item.location}</span>
          </div>
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
