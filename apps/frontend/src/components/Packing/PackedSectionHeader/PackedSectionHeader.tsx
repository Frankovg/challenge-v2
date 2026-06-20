import { type FC } from 'react'

import { Button } from 'components/ui/Button'

import { Barcode } from '../Barcode'
import { PackageButtons } from '../PackageButtons'
import { SectionTitle } from '../SectionTitle'

import { HeaderContainer } from './PackedSectionHeader.styles'

type Props = {
  quantityPackages: number
  disabledShipping: boolean
  disableDeletePackage: boolean
  handleShipPackages: VoidFunction
  handleAddPackage: VoidFunction
  handleRemovePackage: VoidFunction
}

export const PackedSectionHeader: FC<Props> = (props) => {
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
