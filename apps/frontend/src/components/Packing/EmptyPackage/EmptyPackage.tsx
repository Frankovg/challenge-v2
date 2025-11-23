import { Box } from "lucide-react"

import { EmptyPackageContainer } from "./EmptyPackage.styles"

export const EmptyPackage = () => {
  return (
    <EmptyPackageContainer >
      <Box size={64} strokeWidth={1.25} data-testid="package-icon" />
      <h5>Package is Empty</h5>
      <p>Select products from the left to add them here.</p>
    </EmptyPackageContainer>
  )
}
