import { FC } from "react"

import { ItemNameContainer } from "./ItemName.styles"

type Props = {
  item: {
    sku: string,
    location: string
  }
}

export const ItemName: FC<Props> = ({ item }) => {
  return (
    <ItemNameContainer >
      <p>{item.sku}</p>
      <span>{item.location}</span>
    </ItemNameContainer>
  )
}
