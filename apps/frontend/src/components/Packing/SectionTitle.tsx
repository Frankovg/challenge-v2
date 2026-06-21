import { styled } from 'styled-components'

const SectionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  p {
    font-size: var(--font-size-sm);
  }
`

type Props = {
  title: string
  subtitle?: string
}

export const SectionTitle = (props: Props) => {
  const { title, subtitle } = props
  return (
    <SectionTitleContainer>
      <h4>{title}</h4>
      {subtitle && <p>{subtitle}</p>}
    </SectionTitleContainer>
  )
}
