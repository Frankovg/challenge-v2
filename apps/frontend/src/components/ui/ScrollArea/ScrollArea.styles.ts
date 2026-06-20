import { styled } from 'styled-components'

interface ScrollAreaContainerProps {
  $direction: 'horizontal' | 'vertical'
}

export const ScrollAreaContainer = styled.div<ScrollAreaContainerProps>`
  display: flex;
  flex-direction: ${({ $direction }) =>
    $direction === 'horizontal' ? 'row' : 'column'};
  gap: 0.5rem;
  overflow-y: ${({ $direction }) =>
    $direction === 'vertical' ? 'auto' : 'hidden'};
  overflow-x: ${({ $direction }) =>
    $direction === 'horizontal' ? 'auto' : 'hidden'};
  flex: 1;
  padding-right: ${({ $direction }) =>
    $direction === 'vertical' ? '0.5rem' : '0'};
  padding-bottom: ${({ $direction }) =>
    $direction === 'horizontal' ? '0.5rem' : '0'};
`
