import React, { type FC } from 'react'

import { Wrapper, Table } from './PackageContent.styles'

export const PackageContent: FC = () => {
  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <th>name</th>
            <th>quantity</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Green Ball</td>
            <td>2</td>
          </tr>

          <tr>
            <td>Blue Ball</td>
            <td>2</td>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  )
}
