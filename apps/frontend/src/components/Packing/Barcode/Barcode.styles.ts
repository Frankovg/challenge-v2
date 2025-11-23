
import { styled } from 'styled-components'

export const BarcodeForm = styled.form`
  display: flex;
  width: 45vw;
  display: flex;
  align-items: start;
  gap: var(--spacing-xs);

  .input-container {
    width: 100%;
    height: 4rem;

    span {
      font-size: var(--font-size-xs);
      color: var(--status-error-text);
    }
  }
`
