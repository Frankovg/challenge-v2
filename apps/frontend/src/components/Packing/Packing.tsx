'use client'

import React, { useEffect, type FC } from 'react'

import { useLineItemsQuery } from '../../hooks/useLineItemsQuery'

import { PackageContent } from './PackageContent'
import { PackageTab } from './PackageTab'
import { DashboardWrapper, PackingSection } from './Packing.styles'

export const Packing: FC = () => {
  const { lineItems } = useLineItemsQuery()

  useEffect(() => {
    if (lineItems.length > 0) {
      console.log('Line items ready to pack:', lineItems)
    }
  }, [lineItems])
  console.log(lineItems);

  return (
    <DashboardWrapper>
      <PackingSection>
        Unpacked products
        {lineItems && lineItems?.map((item) => (
          <span key={item.id}>{item.sku}</span>
        ))}
      </PackingSection>

      <PackingSection>
        <h3>Packed Products</h3>
        <button>Add Package</button>
        <hr />
        <PackageTab number={1} />
        <PackageTab active number={2} />
        <PackageTab number={3} />
        <PackageTab number={4} />
        <PackageContent />
      </PackingSection>
    </DashboardWrapper>
  )
}
