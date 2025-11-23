import { Tooltip as MuiTooltip, type TooltipProps } from "@mui/material"
import { FC } from "react"

export const Tooltip: FC<TooltipProps> = ({ arrow = true, ...props }) => {
  const { children } = props
  return (
    <MuiTooltip
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
    </MuiTooltip>
  )
}
