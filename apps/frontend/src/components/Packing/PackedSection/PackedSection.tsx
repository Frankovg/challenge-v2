import { Plus, Trash2 } from 'lucide-react';

import { IconButton } from 'components/ui/IconButton';
import { ScrollArea } from 'components/ui/ScrollArea';
import { Tabs } from "components/ui/Tabs";
import { useLineItems } from "hooks/useLineItems";

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
    removePackage
  } = useLineItems()

  const handleAddPackage = (): void => {
    addPackage()
    setSelectedPackageIndex(packages.length)
  }

  const handleRemovePackage = (): void => {
    if (packages.length <= 1) return

    const packageId = selectedPackageData.id
    removePackage(packageId)

    if (selectedPackageIndex >= packages.length - 1) {
      setSelectedPackageIndex(Math.max(0, packages.length - 2))
    }
  }

  if (!selectedPackageData) return null

  return (
    <PackedSectionContainer>
      <HeaderContainer>
        <h3>Packed Products</h3>
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
            disabled={packages.length <= 1}
          >
            <Trash2 size={20} />
          </IconButton>
        </ButtonGroup>
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
    </PackedSectionContainer>
  )
}
