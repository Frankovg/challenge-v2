import { useContext } from "react"

import { AppContext } from "contexts/AppContext"
import { LineItemsContextType } from "types"

export const useApp = (): LineItemsContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useLineItems must be used within a LineItemsProvider')
  }
  return context
}
