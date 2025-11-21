
import { FC, ReactNode } from "react"

import { CardContainer } from "./Card.styles"

type Props = {
  content: ReactNode
}

export const Card: FC<Props> = (props) => {
  return (
    <CardContainer>
      {props.content}
    </CardContainer>
  )
}
