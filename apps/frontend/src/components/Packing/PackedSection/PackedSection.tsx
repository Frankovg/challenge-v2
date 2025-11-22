import { useState } from "react";

import { Tabs } from "components/ui/Tabs";

import { PackageContent } from "../PackageContent"

import { PackedSectionContainer } from "./PackedSection.styles"

export const mockedItemInPackage = [
  {
    id: 0,
    line_items: [
      {
        id: 2,
        location: "a2",
        quantity: 6,
        sku: "red-ball"
      }
    ]
  }
]

export const PackedSection = () => {
  const [selectedPackage, setSelectedPackage] = useState<number>(0)
  // const [packages, setPackages] = useState<TabItem[]>([
  //   { value: 0, label: "Package 1", icon: <BoxIcon size={14} /> },
  //   { value: 1, label: "Package 2" },
  //   { value: 2, label: "Package 3" },
  //   { value: 3, label: "Package 4" },
  //   { value: 4, label: "Package 5" },
  //   { value: 5, label: "Package 6" },
  //   { value: 6, label: "Package 7" },
  //   { value: 7, label: "Package 8" },
  //   { value: 8, label: "Package 9" },
  //   { value: 9, label: "Package 10" },
  // ]);

  const packages = [
    { value: 0, label: "Package 1" },
    { value: 1, label: "Package 2" },
  ]

  return (
    <PackedSectionContainer>
      <h3>Packed Products</h3>
      <Tabs
        tabs={packages}
        value={selectedPackage}
        onChange={setSelectedPackage}
        aria-label="Scrollable tabs"
        variant="scrollable"
      />
      <PackageContent packageId={selectedPackage} />
    </PackedSectionContainer>
  )
}
