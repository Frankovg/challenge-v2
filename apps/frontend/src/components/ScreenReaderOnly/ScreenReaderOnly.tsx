import { ReactNode } from "react";

import { ScreenReaderOnlyContainer } from './ScreenReaderOnly.styles'

export const ScreenReaderOnly = ({ text }: { text: string }): ReactNode => {
  return (
    <ScreenReaderOnlyContainer aria-readonly={true}>{text}</ScreenReaderOnlyContainer>
  )
}
