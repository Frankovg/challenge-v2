import { FC } from 'react'

import { SectionTitleContainer } from './SectionTitle.styles'

type Props = {
  title: string
  subtitle?: string
}

export const SectionTitle: FC<Props> = (props) => {
  const { title, subtitle } = props
  return (
    <SectionTitleContainer>
      <h4>{title}</h4>
      {subtitle && <p>{subtitle}</p>}
    </SectionTitleContainer>
  )
}
