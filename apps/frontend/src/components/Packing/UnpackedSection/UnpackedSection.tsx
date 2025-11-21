'use client'

import { useEffect } from "react"

import { ScrollArea } from "components/ui/ScrollArea"
import { useLineItemsQuery } from "hooks/useLineItemsQuery"

import { UnpackedItem } from "../UnpackedItem"

import { UnpackedSectionContainer } from "./UnpackedSection.styles"

export const UnpackedSection = () => {
  const { lineItems } = useLineItemsQuery()

  useEffect(() => {
    if (lineItems.length > 0) {
      console.log('Line items ready to pack:', lineItems)
    }
  }, [lineItems])

  return (
    <UnpackedSectionContainer>
      Unpacked products
      <ScrollArea>
        {lineItems && lineItems?.map((item) => (
          <UnpackedItem key={item.id} item={item} />
        ))}
      </ScrollArea>
    </UnpackedSectionContainer>
  )
}
