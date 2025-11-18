import { styled } from 'styled-components'

type WrapperProps = {
  $active?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  display: inline-block;
  padding: 10px;
  border-width: 1px;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
`
