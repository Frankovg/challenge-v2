'use client'

import { useCallback, type Dispatch } from 'react'

import { useToast } from 'components/ui/toast/ToastProvider'
import { usePackItemsMutation } from 'hooks/usePackItemsMutation'

import type { PackingAction } from 'contexts/packingReducer'
import type { PackedPackage } from 'types'

type UseShippingResult = {
  shipPackages: (items: PackedPackage[], ready: boolean) => Promise<void>
  loading: boolean
}

export const useShipping = (
  dispatch: Dispatch<PackingAction>,
): UseShippingResult => {
  const { packItems, loading, error } = usePackItemsMutation()
  const { add: addToast } = useToast()

  const shipPackages = useCallback(
    async (items: PackedPackage[], ready: boolean): Promise<void> => {
      if (!ready) {
        addToast({
          title: 'Shipping Error',
          description: 'Complete or remove empty packages.',
          type: 'error',
        })
        return
      }

      try {
        const result = await packItems(items)

        dispatch({ type: 'CLEAR_PACKAGES' })

        if (process.env.NODE_ENV === 'development')
          console.log('Packed: ', result)

        addToast({
          title: 'Shipment created successfully',
          description: `${items.length} package(s) ready to ship.`,
          type: 'success',
        })
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error(err)
          console.error(error)
        }

        addToast({
          title: 'Shipping Error',
          description: 'Unable to process shipping.',
          type: 'error',
        })
      }
    },
    [dispatch, addToast, packItems, error],
  )

  return { shipPackages, loading }
}
