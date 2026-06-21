'use client'

import { useCallback, useState, type Dispatch } from 'react'

import { useToast } from 'components/ui/Toast'
import { usePackItemsMutation } from 'hooks/usePackItemsMutation'
import { sleep } from 'lib/sleep'

import type { PackingAction } from 'contexts/packingReducer'
import type { PackedPackage } from 'types'

type UseShippingResult = {
  shipPackages: (items: PackedPackage[], ready: boolean) => Promise<void>
  loading: boolean
}

/**
 * Encapsulates the ship flow: the async mutation, loading state, error
 * handling and the dev-only artificial latency. On success it clears the
 * packages through the reducer, keeping this concern out of the provider.
 */
export const useShipping = (
  dispatch: Dispatch<PackingAction>,
): UseShippingResult => {
  const [loading, setLoading] = useState(false)
  const { packItems, error } = usePackItemsMutation()
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
        setLoading(true)
        if (process.env.NODE_ENV === 'development') {
          await sleep(1000)
        }

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
      } finally {
        setLoading(false)
      }
    },
    [dispatch, addToast, packItems, error],
  )

  return { shipPackages, loading }
}
