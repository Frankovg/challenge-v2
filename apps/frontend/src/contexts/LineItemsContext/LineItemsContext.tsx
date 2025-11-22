'use client'

import React, {
  createContext,
  useState,
  type ReactNode,
} from 'react'

import { type TabItem } from 'components/ui/Tabs'
import { LineItemsContextType, type LineItemType } from 'types'

export const LineItemsContext = createContext<LineItemsContextType | undefined>(undefined)

type LineItemsProviderProps = {
  children: ReactNode
  initialLineItems: LineItemType[]
}

export const LineItemsProvider = ({
  children,
  initialLineItems,
}: LineItemsProviderProps): ReactNode => {
  const initialPackage = [
    { value: 0, label: "Package 1" },
  ]

  const [lineItems, setLineItems] = useState<LineItemType[]>(initialLineItems)
  const [packages, setPackages] = useState<TabItem[]>(initialPackage)

  return (
    <LineItemsContext.Provider
      value={{
        lineItems,
        setLineItems,
        packages,
        setPackages
      }}
    >
      {children}
    </LineItemsContext.Provider>
  )
}
