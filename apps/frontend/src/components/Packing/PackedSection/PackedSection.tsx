import { PackageContent } from "../PackageContent"
import { PackageTab } from "../PackageTab"

import { PackedSectionContainer } from "./PackedSection.styles"

export const PackedSection = () => {
  return (
    <PackedSectionContainer>
      <h3>Packed Products</h3>
      <button>Add Package</button>
      <hr />
      <PackageTab number={1} />
      <PackageTab active number={2} />
      <PackageTab number={3} />
      <PackageTab number={4} />
      <PackageContent />
    </PackedSectionContainer>
  )
}
