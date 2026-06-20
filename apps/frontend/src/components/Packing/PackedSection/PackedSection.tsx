'use client'

import { useState } from 'react'

import { Dialog } from 'components/ui/Dialog'
import { Box } from 'components/ui/icons'
import { ScrollArea } from 'components/ui/ScrollArea'
import { Tabs } from 'components/ui/Tabs'
import { useApp } from 'hooks/useApp'

import { ConfirmationModal } from '../ConfirmationModal'
import { PackageContent } from '../PackageContent'
import { PackedItem } from '../PackedItem'
import { PackedSectionHeader } from '../PackedSectionHeader'

import { MODAL_DICTIONARY } from './const'
import { EmptyState, PackedSectionContainer } from './PackedSection.styles'

import type { PackedPackage } from 'types'

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
