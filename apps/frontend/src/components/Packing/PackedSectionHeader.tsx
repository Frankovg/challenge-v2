import { styled } from 'styled-components'

import { Barcode } from 'components/packing/Barcode'
import { PackageButtons } from 'components/packing/PackageButtons'
import { SectionTitle } from 'components/packing/SectionTitle'
import { Button } from 'components/ui/Button'


const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  .top-header {
    display: flex;
    align-items: start;
    justify-content: space-between;
  }

  .bottom-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }
`

type Props = {
  quantityPackages: number
  disabledShipping: boolean
  disableDeletePackage: boolean
  handleShipPackages: VoidFunction
  handleAddPackage: VoidFunction
  handleRemovePackage: VoidFunction
}

export const PackedSectionHeader = (props: Props) => {
  const {
    quantityPackages,
    disabledShipping,
    disableDeletePackage,
    handleShipPackages,
    handleAddPackage,
    handleRemovePackage,
  } = props

  return (
    <HeaderContainer>
      <div className="top-header">
        <SectionTitle
          title="Packed Products"
          subtitle={`${quantityPackages} package(s) created`}
        />
        <Button
          color="success"
          disabled={disabledShipping}
          onClick={handleShipPackages}
        >
          Ship Package(s)
        </Button>
      </div>
      <div className="bottom-header">
        <Barcode />
        <PackageButtons
          add={handleAddPackage}
          remove={handleRemovePackage}
          disabledRemove={disableDeletePackage}
        />
      </div>
    </HeaderContainer>
  )
}
