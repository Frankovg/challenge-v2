'use client'

import { useState } from 'react';

import { Button } from 'components/ui/Button';
import { Modal } from 'components/ui/Modal';
import { ScrollArea } from 'components/ui/ScrollArea';
import { Tabs } from "components/ui/Tabs";
import { useApp } from "hooks/useApp";


import { ConfirmationModal } from '../ConfirmationModal';
import { PackageButtons } from '../PackageButtons';
import { PackageContent } from "../PackageContent"
import { PackedItem } from '../PackedItem';
import { SectionTitle } from '../SectionTitle';

import { MODAL_DICTIONARY } from './const';
import { HeaderContainer, PackedSectionContainer } from "./PackedSection.styles"

import type { PackedPackage } from 'types';

type ModalState = {
  open: boolean,
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
    shipPackages
  } = useApp()

  const initialModalState: ModalState = { open: false, action: 'ship' }

  const [openConfirmationModal, setOpenConfirmationModal] = useState(initialModalState)
  const [pendingPackageIdToRemove, setPendingPackageIdToRemove] = useState<number | null>(null)

  const handleAddPackage = (): void => {
    addPackage()
    setSelectedPackageIndex(packages.length)
  }

  const handleRemovePackage = (): void => {
    if (packages.length === 0) return

    const packageId = selectedPackageData.id
    const packageToRemove = packages.find(pkg => pkg.data.id === packageId)
    const hasItems = packageToRemove && packageToRemove.data.line_items.length > 0

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
      await shipPackages(items)
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
      <HeaderContainer>
        <div className='top-header'>
          <SectionTitle
            title='Packed Products'
            subtitle={`${packages.length} package(s) created`}
          />
          <Button
            variant='primary'
            color='success'
            disabled={!readyForShipping}
            onClick={handleShipPackages}
          >
            Ship Package(s)
          </Button>
        </div>
        <div className='bottom-header'>
          <div>
            {/* //TODO: barcode */}
          </div>
          <PackageButtons
            add={handleAddPackage}
            remove={handleRemovePackage}
            disabledRemove={packages.length === 1 && selectedPackageData.line_items.length === 0}
          />
        </div>
      </HeaderContainer>

      <Tabs
        tabs={packages}
        value={selectedPackageIndex}
        onChange={setSelectedPackageIndex}
        aria-label="Scrollable tabs"
        variant="scrollable"
      />

      <PackageContent >
        <ScrollArea>
          {selectedPackageData.line_items?.map((item) => (
            <PackedItem
              key={item.id}
              item={item}
            />
          ))}
        </ScrollArea>
      </PackageContent>

      <Modal
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
          buttonLabel={MODAL_DICTIONARY[openConfirmationModal.action].buttonLabel}
          description={MODAL_DICTIONARY[openConfirmationModal.action].description}
        />
      </Modal>
    </PackedSectionContainer>
  )
}
