import TooltipMUI, { TooltipProps } from "@mui/material/Tooltip"
import { FC } from "react"

export const Tooltip: FC<TooltipProps> = ({ arrow = true, ...props }) => {
  const { children } = props
  return (
    <TooltipMUI
      {...props}
      arrow={arrow}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -5],
              },
            },
          ],
        },
      }}>
      {children}
    </TooltipMUI>
  )
}
