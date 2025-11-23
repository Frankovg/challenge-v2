import { TextFieldProps } from "@mui/material/TextField"
import { FC } from "react"

import { CssTextField } from "./Input.styles"

export const Input: FC<TextFieldProps> = (props) => {
  return (
    <CssTextField {...props} />
  )
}
