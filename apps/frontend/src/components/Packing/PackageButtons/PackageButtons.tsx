import { Plus, Trash2 } from "lucide-react"
import { FC } from "react"

import { IconButton } from "components/ui/IconButton"
import { Tooltip } from "components/ui/Tooltip"

import { PackageButtonsContainer } from "./PackageButtons.styles"

type Props = {
  add: VoidFunction,
  remove: VoidFunction,
  disabledRemove?: boolean
}

export const PackageButtons: FC<Props> = ({ add, remove, disabledRemove = false }) => {
  return (
    <PackageButtonsContainer >
      <Tooltip title='Add Package' >
        <IconButton
          onClick={add}
          aria-label="Add package"
        >
          <Plus size={20} />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete Package' >
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
