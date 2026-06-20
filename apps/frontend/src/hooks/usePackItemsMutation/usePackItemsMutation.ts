import { useMutation, gql } from '@apollo/client'

import {
  type PackItemsMutationResponse,
  type UsePackItemsMutationType,
  type PackedPackage,
  type PackedPackages,
} from 'types'

export const PACK_ITEMS_MUTATION = gql`
  mutation PackItems($data: PackItemsInput!) {
    pack_items(data: $data) {
      packages {
        id
        line_items {
          id
          quantity
          sku
          location
        }
      }
    }
  }
`

export const usePackItemsMutation = (): UsePackItemsMutationType => {
  const [packItems, { data, loading, error }] = useMutation<
    PackItemsMutationResponse,
    { data: PackedPackages }
  >(PACK_ITEMS_MUTATION)

  const execute = async (
    packages: PackedPackage[],
  ): Promise<PackedPackages> => {
    const response = await packItems({
      variables: {
        data: { packages },
      },
    })

    if (!response.data) {
      throw new Error('No data returned from pack_items mutation')
    }

    return response.data.pack_items
  }

  return {
    packItems: execute,
    data,
    loading,
    error,
  }
}
