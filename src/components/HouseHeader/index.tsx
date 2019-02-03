import React, { FunctionComponent } from 'react'
import { GiPositionMarker } from 'react-icons/gi'
import { MdArrowBack } from 'react-icons/md'
import styled from '../_utils/styledComponents'
import { House } from '../../services/house/types'
import Hr from '../Hr'

const Wrapper = styled.div`
  position: relative;
  background-color: ${props => props.theme.canvas_first};
  text-align: center;
  padding: 1em;
`

const BackBtn = styled(MdArrowBack)`
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  font-size: 2em;
  cursor: pointer;

  @media (hover: hover) {
    transition: all 0.3s ease-out;

    :hover {
      opacity: 0.75;
      transform: scale(1.1);
    }
  }
`

interface Props {
  house: House
  onBack: () => void
}

const HouseHeader: FunctionComponent<Props> = ({ house, onBack }) => (
  <Wrapper>
    <BackBtn onClick={onBack} />

    <h1>{house.name}</h1>
    <Hr width="50px" />
    <h3>
      <GiPositionMarker /> {house.region}
    </h3>
    <h4>{house.titles.join(', ')}</h4>
  </Wrapper>
)

export default HouseHeader
