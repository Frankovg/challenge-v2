import React, { type FC } from 'react'

import { ScrollArea } from 'components/ui/ScrollArea'

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
        <span>{packageId}</span>
      </ScrollArea>
    </>
  )
}
