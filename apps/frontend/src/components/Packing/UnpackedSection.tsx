import { type ReactNode } from 'react'
import { styled } from 'styled-components'

import { SectionTitle } from 'components/packing/SectionTitle'
import { UnpackedItem } from 'components/packing/UnpackedItem'
import { ScrollArea } from 'components/ui/ScrollArea'
import { useApp } from 'contexts/AppContext'

import type { AddToPackageButton, LineItemType } from 'types'


const UnpackedSectionContainer = styled.section`
  width: 30%;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`

export const UnpackedSection = (): ReactNode => {
  const { lineItems, selectedPackageData, packProduct } = useApp()

  const selectedPackageId = selectedPackageData?.id ?? 0

  const handlePack = (item: LineItemType, q: AddToPackageButton): void => {
    const quantity = q === 'one' ? 1 : item.quantity
    packProduct(item, selectedPackageId, quantity)
  }

  return (
    <UnpackedSectionContainer>
      <SectionTitle
        title="Unpacked products"
        subtitle={`${lineItems.length} product(s) remaining`}
      />

      <ScrollArea>
        {lineItems?.map((item) => (
          <UnpackedItem
            key={item.id}
            item={item}
            handleClick={(q) => handlePack(item, q)}
          />
        ))}
      </ScrollArea>
    </UnpackedSectionContainer>
  )
}
