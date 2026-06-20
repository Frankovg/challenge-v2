'use client'

import { useState } from 'react'
import { styled } from 'styled-components'

import { ConfirmationModal } from 'components/Packing/ConfirmationModal'
import { PackageContent } from 'components/Packing/PackageContent'
import { PackedItem } from 'components/Packing/PackedItem'
import { PackedSectionHeader } from 'components/Packing/PackedSectionHeader'
import { Dialog } from 'components/ui/Dialog'
import { Box } from 'components/ui/icons'
import { ScrollArea } from 'components/ui/ScrollArea'
import { Tabs } from 'components/ui/Tabs'
import { useApp } from 'hooks/useApp'

import type { PackedPackage } from 'types'


const MODAL_DICTIONARY = {
  ship: {
    title: 'Ship All Package(s)',
    buttonLabel: 'Ship package(s)',
    description:
      'All items have been packed. Once shipped, packages cannot be modified. Are you sure you want to proceed?',
  },
  delete: {
    title: 'Delete Package with Items?',
    buttonLabel: 'Delete Package',
    description:
      'This package contains items. If you delete it, all items will be returned to the unpacked list. Are you sure you want to continue?',
  },
} as const

const PackedSectionContainer = styled.section`
  width: 70%;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border-primary);
`

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-block: var(--spacing-3xl);

  p {
    font-size: var(--font-size-sm);
  }

  svg {
    margin-bottom: var(--spacing-md);
  }
`

type ModalState = {
  open: boolean
  action: 'delete' | 'ship'
}

export const PackedSection = () => {
  const {
    packages,
    selectedPackageIndex,
    setSelectedPackageIndex,
    selectedPackageData,
    addPackage,
    removePackage,
    readyForShipping,
    shipPackages,
    loading,
  } = useApp()

  const initialModalState: ModalState = { open: false, action: 'ship' }

  const [openConfirmationModal, setOpenConfirmationModal] =
    useState(initialModalState)
  const [pendingPackageIdToRemove, setPendingPackageIdToRemove] = useState<
    number | null
  >(null)

  const handleAddPackage = (): void => {
    addPackage()
    setSelectedPackageIndex(packages.length)
  }

  const handleRemovePackage = (): void => {
    if (packages.length === 0 || !selectedPackageData) return

    const packageId = selectedPackageData.id
    const packageToRemove = packages.find((pkg) => pkg.data.id === packageId)
    const hasItems =
      packageToRemove && packageToRemove.data.line_items.length > 0

    if (hasItems) {
      setPendingPackageIdToRemove(packageId)
      setOpenConfirmationModal({ open: true, action: 'delete' })
    } else {
      removePackage(packageId)
    }
  }

  const handleCloseModal = (): void => {
    setOpenConfirmationModal(initialModalState)
    setPendingPackageIdToRemove(null)
  }

  const handleShipPackages = (): void => {
    setOpenConfirmationModal({ open: true, action: 'ship' })
  }

  const handleConfirmModal = async (): Promise<void> => {
    if (openConfirmationModal.action === 'ship') {
      const items: PackedPackage[] = packages.map((pack) => pack.data)
      await shipPackages(items, readyForShipping)
    } else {
      if (pendingPackageIdToRemove !== null) {
        removePackage(pendingPackageIdToRemove, true)
      }
    }
    handleCloseModal()
  }

  if (!selectedPackageData) return null

  return (
    <PackedSectionContainer>
      <PackedSectionHeader
        quantityPackages={packages.length}
        disabledShipping={!readyForShipping}
        disableDeletePackage={
          packages.length === 1 && selectedPackageData.line_items.length === 0
        }
        handleShipPackages={handleShipPackages}
        handleAddPackage={handleAddPackage}
        handleRemovePackage={handleRemovePackage}
      />

      <Tabs
        tabs={packages}
        value={selectedPackageIndex}
        onChange={setSelectedPackageIndex}
        aria-label="Scrollable tabs"
        variant="scrollable"
      />

      <PackageContent>
        {selectedPackageData.line_items.length ? (
          <ScrollArea>
            {selectedPackageData.line_items?.map((item) => (
              <PackedItem key={item.id} item={item} />
            ))}
          </ScrollArea>
        ) : (
          <EmptyState>
            <Box size={64} strokeWidth={1.25} />
            <h5>Package is Empty</h5>
            <p>Select products from the left to add them here.</p>
          </EmptyState>
        )}
      </PackageContent>

      <Dialog
        open={openConfirmationModal.open}
        onClose={handleCloseModal}
        ariaLabelledBy={`confirm-${openConfirmationModal.action}-modal-title`}
        ariaDescribedBy={`confirm-${openConfirmationModal.action}-modal-description`}
      >
        <ConfirmationModal
          variant={openConfirmationModal.action}
          close={handleCloseModal}
          confirm={handleConfirmModal}
          title={MODAL_DICTIONARY[openConfirmationModal.action].title}
          buttonLabel={
            MODAL_DICTIONARY[openConfirmationModal.action].buttonLabel
          }
          description={
            MODAL_DICTIONARY[openConfirmationModal.action].description
          }
          isLoading={loading}
        />
      </Dialog>
    </PackedSectionContainer>
  )
}
