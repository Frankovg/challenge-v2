import { styled } from 'styled-components'

import { Card } from 'components/ui/Card'
import { CardButton } from 'components/ui/CardButton'
import { Tooltip } from 'components/ui/Tooltip'

import type { AddToPackageButton, LineItemType } from 'types'

const UnpackedItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .actions-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  .quantity-container {
    width: 2.3rem;
    height: 2.3rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-sm);
    margin-right: 0.5rem;
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    border: 1px solid var(--border-secondary);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    user-select: none;
    transition:
      background-color var(--transition-base),
      border-color var(--transition-base);
  }
`

const ItemNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2rem;

  span {
    color: var(--status-info-text);
    font-size: var(--font-size-sm);
  }

  .sku {
    font-size: var(--font-size-xs);
    line-height: 1px;
  }
`

type Props = {
  item: LineItemType
  handleClick: (q: AddToPackageButton) => void
}

export const UnpackedItem = (props: Props) => {
  const { item, handleClick } = props

  return (
    <Card
      content={
        <UnpackedItemContainer>
          <ItemNameContainer>
            <p className="sku">sku</p>
            <p>{item.sku}</p>
            <span>{item.location.toUpperCase()}</span>
          </ItemNameContainer>
          <div className="actions-container">
            <Tooltip title="Quantity">
              <div className="quantity-container">{item.quantity}</div>
            </Tooltip>
            <Tooltip title="Add One">
              <CardButton onClick={() => handleClick('one')}>+1</CardButton>
            </Tooltip>
            <Tooltip title="Add All">
              <CardButton onClick={() => handleClick('all')}>All</CardButton>
            </Tooltip>
          </div>
        </UnpackedItemContainer>
      }
    />
  )
}
