import { useCallback, type ReactNode } from 'react'

import { ScrollArea } from 'components/ui/ScrollArea'
import { useApp } from 'hooks/useApp'

import { SectionTitle } from '../SectionTitle'
import { UnpackedItem } from '../UnpackedItem'

import { UnpackedSectionContainer } from './UnpackedSection.styles'

import type { AddToPackageButton, LineItemType } from 'types'

export const UnpackedSection = (): ReactNode => {
  const { lineItems, selectedPackageData, packProduct } = useApp()

  const selectedPackageId = selectedPackageData?.id ?? 0

  const handlePack = useCallback(
    (item: LineItemType, q: AddToPackageButton): void => {
      const quantity = q === 'one' ? 1 : item.quantity
      packProduct(item, selectedPackageId, quantity)
    },
    [packProduct, selectedPackageId],
  )

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
