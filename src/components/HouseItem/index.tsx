import React, { FunctionComponent } from 'react'
import styled from '../_utils/styledComponents'
import { House } from '../../services/house/types'
import mediaQuaery from '../_utils/mediaQuery'
import FlexBox from '../FlexBox'

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 0.1em;
  width: calc(50% - 2 * 0.1em);
  padding-bottom: calc(50% - 2 * 0.1em);
  cursor: pointer;

  ${mediaQuaery.sm`
    width: calc(100%/3 - 3*0.1em);
    padding-bottom: calc(100%/3 - 3*0.1em);
  `};

  ${mediaQuaery.md`
    width: calc(25% - 4*0.1em);
    padding-bottom: calc(25% - 4*0.1em);
  `};

  ${mediaQuaery.lg`
    width: calc(100%/6 - 6*0.2em);
    padding-bottom: calc(100%/6 - 6*0.2em);
  `};

  @media (hover: hover) {
    transition: opacity 0.3s ease-out;

    :hover {
      opacity: 0.75;
    }
  }
`

const Inner = styled(FlexBox)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  background-image: linear-gradient(to right top, #656663 0%, #d5d0c4 100%);
`

const Name = styled.h3`
  text-align: center;
  font-size: 1.1em;
`

interface Props {
  house: House
  onClick: (id: string) => void
}

const HouseItem: FunctionComponent<Props> = ({ house, onClick }) => (
  <Wrapper onClick={() => onClick(house.id)}>
    <Inner alignItems="center" justifyContent="center">
      <Name>{house.name}</Name>
    </Inner>
  </Wrapper>
)

export default HouseItem
