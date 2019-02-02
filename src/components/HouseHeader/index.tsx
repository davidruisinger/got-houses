import React, { FunctionComponent } from 'react'
import { GiPositionMarker } from 'react-icons/gi'
import { MdArrowBack, MdHome } from 'react-icons/md'
import styled, { css } from '../_utils/styledComponents'
import { House } from '../../services/house/types'
import Hr from '../Hr'

const Wrapper = styled.div`
  position: relative;
  background-color: ${props => props.theme.washington_blue};
  text-align: center;
  padding: 1em;
`

const buttonStyles = css`
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

const HomeBtn = styled(MdHome)`
  ${buttonStyles}
`

const BackBtn = styled(MdArrowBack)`
  ${buttonStyles}
`

interface Props {
  house: House
  onBack: () => void
  homeInsteadBack?: boolean
}

const HouseHeader: FunctionComponent<Props> = ({
  house,
  onBack,
  homeInsteadBack,
}) => (
  <Wrapper>
    {homeInsteadBack ? (
      <HomeBtn onClick={onBack} />
    ) : (
      <BackBtn onClick={onBack} />
    )}
    <h1>{house.name}</h1>
    <Hr width="50px" />
    <h2>
      <GiPositionMarker /> {house.region}
    </h2>
    <h4>{house.titles.join(', ')}</h4>
  </Wrapper>
)

HouseHeader.defaultProps = {
  homeInsteadBack: false,
}

export default HouseHeader
