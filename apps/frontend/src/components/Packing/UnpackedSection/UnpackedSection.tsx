import { useEffect, type FC } from 'react'

import { ScrollArea } from 'components/ui/ScrollArea'
import { LineItemType } from 'types'

import { UnpackedItem } from '../UnpackedItem'

import { UnpackedSectionContainer } from './UnpackedSection.styles'

type UnpackedSectionProps = {
  initialLineItems: LineItemType[]
}

export const UnpackedSection: FC<UnpackedSectionProps> = ({ initialLineItems }) => {
  useEffect(() => {
    if (initialLineItems.length > 0) {
      console.log('Line items ready to pack:', initialLineItems)
    }
  }, [initialLineItems])

  return (
    <UnpackedSectionContainer>
      Unpacked products
      <ScrollArea>
        {initialLineItems?.map((item) => (
          <UnpackedItem key={item.id} item={item} />
        ))}
      </ScrollArea>
    </UnpackedSectionContainer>
  )
}
