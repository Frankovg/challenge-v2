'use client'

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react'

import { type LineItemType } from 'types'

type LineItemsContextType = {
  lineItems: LineItemType[]
  setLineItems: Dispatch<SetStateAction<LineItemType[]>>
}

const LineItemsContext = createContext<LineItemsContextType | undefined>(undefined)

type LineItemsProviderProps = {
  children: ReactNode
  initialLineItems: LineItemType[]
}

export const LineItemsProvider = ({
  children,
  initialLineItems,
}: LineItemsProviderProps): ReactNode => {
  const [lineItems, setLineItems] = useState<LineItemType[]>(initialLineItems)

  return (
    <LineItemsContext.Provider value={{ lineItems, setLineItems }}>
      {children}
    </LineItemsContext.Provider>
  )
}

export const useLineItems = (): LineItemsContextType => {
  const context = useContext(LineItemsContext)
  if (context === undefined) {
    throw new Error('useLineItems must be used within a LineItemsProvider')
  }
  return context
}
