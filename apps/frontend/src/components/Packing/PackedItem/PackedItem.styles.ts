import { styled } from 'styled-components'

export const PackedItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);

  .sku-cell {
    grid-column: span 5;
  }

  .location-cell {
    grid-column: span 3;

  }

  .quantity-input {
    grid-column: span 3;
    display: flex;
    justify-content: center;
  }

  .delete-button {
    background-color: transparent;
    border: none;
    grid-column: span 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .trash-icon {
    cursor: pointer;
    transition: color var(--transition-base);

    &:hover {
      color: var(--status-error-text);
    }
  }
`
