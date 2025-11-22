'use client'

import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from 'components/ui/Button';
import { IconButton } from 'components/ui/IconButton';
import { Modal } from 'components/ui/Modal';
import { ScrollArea } from 'components/ui/ScrollArea';
import { Tabs } from "components/ui/Tabs";
import { useLineItems } from "hooks/useLineItems";
import { PackedPackage } from 'types';

import { ConfirmationModal } from '../ConfirmationModal';
import { PackageContent } from "../PackageContent"
import { PackedItem } from '../PackedItem';

import { ButtonGroup, HeaderContainer, PackedSectionContainer } from "./PackedSection.styles"

export const PackedSection = () => {
  const {
    packages,
    selectedPackageIndex,
    setSelectedPackageIndex,
    selectedPackageData,
    addPackage,
    removePackage,
    allItemsPacked,
    shipPackages
  } = useLineItems()


  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
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
      setOpenConfirmationModal(true)
    } else {
      removePackage(packageId)
    }
  }

  const handleCloseModal = (): void => {
    setOpenConfirmationModal(false)
    setPendingPackageIdToRemove(null)
  }

  const handleConfirmRemove = (): void => {
    if (pendingPackageIdToRemove !== null) {
      removePackage(pendingPackageIdToRemove, true)
    }
    handleCloseModal()
  }

  const handleShipPackages = async (): Promise<void> => {
    const items: PackedPackage[] = packages.map((pack) => pack.data)
    shipPackages(items)
  }

  if (!selectedPackageData) return null

  return (
    <PackedSectionContainer>
      <HeaderContainer>
        <div className='top-header'>
          <h3>Packed Products</h3>
          <Button
            variant='primary'
            color='success'
            disabled={!allItemsPacked}
            onClick={handleShipPackages}
          >
            Ship Package(s)
          </Button>
        </div>
        <div className='bottom-header'>
          <div>
            {/* //TODO: barcode */}
          </div>
          <ButtonGroup>
            <IconButton
              onClick={handleAddPackage}
              aria-label="Add package"
              title="Add package"
            >
              <Plus size={20} />
            </IconButton>
            <IconButton
              onClick={handleRemovePackage}
              aria-label="Remove package"
              title="Remove package"
              disabled={packages.length === 1 && selectedPackageData.line_items.length === 0}
            >
              <Trash2 size={20} />
            </IconButton>
          </ButtonGroup>
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
        open={openConfirmationModal}
        onClose={handleCloseModal}
        ariaLabelledBy="confirm-delete-modal-title"
        ariaDescribedBy="confirm-delete-modal-description"
      >
        <ConfirmationModal
          close={handleCloseModal}
          confirm={handleConfirmRemove}
        />
      </Modal>
    </PackedSectionContainer>
  )
}
