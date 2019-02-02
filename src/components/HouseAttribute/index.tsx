import React, { FunctionComponent, ReactChild } from 'react'
import styled from '../_utils/styledComponents'
import FlexBox from '../FlexBox'
import Container from '../Container'

const Icon = styled.div`
  font-size: 2.8em;
  padding: 0.2em;

  color: ${props => props.theme.washington_blue};
  background-color: ${props => props.theme.ancient_ivory};
`

interface Props {
  icon: ReactChild
  data: string
}

const HouseAttribute: FunctionComponent<Props> = ({ icon, data }) => (
  <FlexBox justifyContent="space-between" alignItems="stretch">
    <Icon>{icon}</Icon>
    <Container>{data}</Container>
  </FlexBox>
)

export default HouseAttribute
