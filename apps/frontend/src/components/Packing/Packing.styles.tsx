import { styled } from 'styled-components'

export const PackingSection = styled.section`
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`

export const DashboardWrapper = styled.div`
  display: flex;
  height: 100%;

  > ${PackingSection} + ${PackingSection} {
    border-left: 1px solid grey;
  }
`
