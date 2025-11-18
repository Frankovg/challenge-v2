import React, { type FC } from 'react'

import { Wrapper } from './PackageTab.styles'

type PackageTabProps = {
  number: number
  active?: boolean
}

export const PackageTab: FC<PackageTabProps> = ({ number, active }) => (
  <Wrapper $active={active}>
    <a>Package {number}</a>
  </Wrapper>
)
