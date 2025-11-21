import React, { type FC } from 'react'

import { ScrollArea } from 'components/ui/ScrollArea'

import { PackedItem } from '../PackedItem'
import { mockedItemInPackage } from '../PackedSection/PackedSection'

import { HEADER_COLUMNS } from './const'
import { HeaderCell, HeaderGrid } from './PackageContent.styles'

type Props = {
  packageId: number
}

export const PackageContent: FC<Props> = (props) => {
  const { packageId } = props

  return (
    <>
      <HeaderGrid>
        {HEADER_COLUMNS.map((column) => (
          <HeaderCell
            key={column.label}
            $colSpan={column.colSpan}
            $align={column.align}
          >
            {column.label}
          </HeaderCell>
        ))}
      </HeaderGrid>
      <ScrollArea>
        {mockedItemInPackage && mockedItemInPackage[packageId]?.line_items.map((item) => (
          <PackedItem key={item.id} item={item} />
        ))}
      </ScrollArea>
    </>
  )
}
