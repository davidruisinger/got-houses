import React, { FunctionComponent } from 'react'
import { GiPositionMarker } from 'react-icons/gi'
import styled from '../_utils/styledComponents'
import { House } from '../../services/house/types'
import Hr from '../Hr'

const Wrapper = styled.div`
  background-color: ${props => props.theme.washington_blue};
  text-align: center;
  padding: 1em;
`

interface Props {
  house: House
}

const HouseHeader: FunctionComponent<Props> = ({ house }) => (
  <Wrapper>
    <h1>{house.name}</h1>
    <Hr width="50px" />
    <h2>
      <GiPositionMarker /> {house.region}
    </h2>
    <h4>{house.titles.join(', ')}</h4>
  </Wrapper>
)

export default HouseHeader
