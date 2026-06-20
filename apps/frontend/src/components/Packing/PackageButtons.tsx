import { FC } from 'react'
import { styled } from 'styled-components'

import { IconButton } from 'components/ui/IconButton'
import { Plus, Trash2 } from 'components/ui/icons'
import { Tooltip } from 'components/ui/Tooltip'

const PackageButtonsContainer = styled.div`
  display: flex;
  gap: var(--spacing-xs);
`

type Props = {
  add: VoidFunction
  remove: VoidFunction
  disabledRemove?: boolean
}

export const PackageButtons: FC<Props> = ({
  add,
  remove,
  disabledRemove = false,
}) => {
  return (
    <PackageButtonsContainer>
      <Tooltip title="Add Package">
        <IconButton onClick={add} aria-label="Add package">
          <Plus size={20} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Package">
        <span>
          <IconButton
            onClick={remove}
            aria-label="Delete package"
            disabled={disabledRemove}
          >
            <Trash2 size={20} />
          </IconButton>
        </span>
      </Tooltip>
    </PackageButtonsContainer>
  )
}
