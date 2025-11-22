import { useContext } from "react"

import { LineItemsContext } from "contexts/LineItemsContext"
import { LineItemsContextType } from "types"

export const useLineItems = (): LineItemsContextType => {
  const context = useContext(LineItemsContext)
  if (context === undefined) {
    throw new Error('useLineItems must be used within a LineItemsProvider')
  }
  return context
}
