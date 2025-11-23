
import { FC } from "react"

import { Card } from "components/ui/Card"
import { CardButton } from "components/ui/CardButton"
import { Tooltip } from "components/ui/Tooltip"

import { ItemNameContainer, UnpackedItemContainer } from "./UnpackedItem.styles"

import type { AddToPackageButton, LineItemType } from "types"

type Props = {
  item: LineItemType
  handleClick: (q: AddToPackageButton) => void
}

export const UnpackedItem: FC<Props> = (props) => {
  const { item, handleClick } = props

  return (
    <Card
      content={
        <UnpackedItemContainer>
          <ItemNameContainer >
            <p>{item.sku}</p>
            <span>{item.location.toUpperCase()}</span>
          </ItemNameContainer>
          <div className="actions-container">
            <Tooltip title='Quantity'>
              <div className="quantity-container">
                {item.quantity}
              </div>
            </Tooltip>
            <Tooltip title='Add One'>
              <CardButton onClick={() => handleClick('one')}>+1</CardButton>
            </Tooltip>
            <Tooltip title='Add All'>
              <CardButton onClick={() => handleClick('all')}>All</CardButton>
            </Tooltip>
          </div>
        </UnpackedItemContainer >
      }
    />
  )
}
