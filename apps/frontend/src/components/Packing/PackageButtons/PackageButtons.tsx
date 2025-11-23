import { Plus, Trash2 } from "lucide-react"
import { FC } from "react"

import { IconButton } from "components/ui/IconButton"

import { PackageButtonsContainer } from "./PackageButtons.styles"

type Props = {
  add: VoidFunction,
  remove: VoidFunction,
  disabledRemove?: boolean
}

export const PackageButtons: FC<Props> = ({ add, remove, disabledRemove = false }) => {
  return (
    <PackageButtonsContainer >
      <IconButton
        onClick={add}
        aria-label="Add package"
        title="Add package"
      >
        <Plus size={20} />
      </IconButton>
      <IconButton
        onClick={remove}
        aria-label="Remove package"
        title="Remove package"
        disabled={disabledRemove}
      >
        <Trash2 size={20} />
      </IconButton>
    </PackageButtonsContainer>
  )
}
