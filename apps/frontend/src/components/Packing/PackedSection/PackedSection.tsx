import { BoxIcon } from "lucide-react";
import { useState } from "react";

import { TabItem, Tabs } from "components/ui/Tabs";

import { PackageContent } from "../PackageContent"

import { PackedSectionContainer } from "./PackedSection.styles"

export const PackedSection = () => {
  const [value, setValue] = useState<string | number>(0)

  const [packages, setPackages] = useState<TabItem[]>([
    { value: 0, label: "Package 1", icon: <BoxIcon size={14} /> },
    // { value: 1, label: "Package 2" },
    // { value: 2, label: "Package 3" },
    // { value: 3, label: "Package 4" },
    // { value: 4, label: "Package 5" },
    // { value: 5, label: "Package 6" },
    // { value: 6, label: "Package 7" },
    // { value: 7, label: "Package 8" },
    // { value: 8, label: "Package 9" },
    // { value: 9, label: "Package 10" },
  ]);

  return (
    <PackedSectionContainer>
      <h3>Packed Products</h3>
      <Tabs
        tabs={packages}
        value={value}
        onChange={setValue}
        aria-label="Scrollable tabs"
        variant="scrollable"
      />
      <PackageContent />
    </PackedSectionContainer>
  )
}
