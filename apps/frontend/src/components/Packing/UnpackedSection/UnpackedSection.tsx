import { type ReactNode } from 'react'

import { ScrollArea } from 'components/ui/ScrollArea'
import { useLineItems } from 'hooks/useLineItems'

import { UnpackedItem } from '../UnpackedItem'

import { UnpackedSectionContainer } from './UnpackedSection.styles'

export const UnpackedSection = (): ReactNode => {
  const { lineItems } = useLineItems()

  return (
    <UnpackedSectionContainer>
      Unpacked products
      <ScrollArea>
        {lineItems?.map((item) => (
          <UnpackedItem key={item.id} item={item} />
        ))}
      </ScrollArea>
    </UnpackedSectionContainer>
  )
}
