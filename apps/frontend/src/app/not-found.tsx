'use client'

import { styled } from 'styled-components'

import { TriangleAlertIcon } from 'components/ui/icons'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

export const CenteredContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Message = styled.p<{ $bold?: boolean; $large?: boolean }>`
  font-size: ${({ $large }) => ($large ? '1.875rem' : '1rem')};
  font-weight: ${({ $bold }) => ($bold ? 700 : 400)};
  text-align: center;
  margin: 0.25rem 0;
`

export default function NotFound() {
  return (
    <Wrapper>
      <CenteredContainer>
        <TriangleAlertIcon size={64} />
        <h3>Products not found</h3>
        <Message $bold $large>
          The link might be corrupted.
        </Message>
        <Message>or the page may have been removed</Message>
      </CenteredContainer>
    </Wrapper>
  )
}
