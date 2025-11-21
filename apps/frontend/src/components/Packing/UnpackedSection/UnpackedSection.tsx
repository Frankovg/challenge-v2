'use client'

import { useEffect } from "react"

import { useLineItemsQuery } from "hooks/useLineItemsQuery"

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
      {lineItems && lineItems?.map((item) => (
        <span key={item.id}>{item.sku}</span>
      ))}
    </UnpackedSectionContainer>
  )
}
