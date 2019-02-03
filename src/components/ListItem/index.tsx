import React, { FunctionComponent } from 'react'
import posed from 'react-pose'
import styled from '../_utils/styledComponents'
import Card from '../Card'
import FlexBox from '../FlexBox'

const animationProps = {
  hoverable: true,
  pressable: true,
  init: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
  },
  press: {
    scale: 0.95,
  },
}

const AnimatedWrapper = styled(posed(Card)(animationProps))`
  padding: 0.5em;
  box-sizing: border-box;
  cursor: pointer;
  background: ${props => props.theme.canvas_first};
  z-index: 9;

  @media (hover: hover) {
    :hover {
      z-index: 999999;
    }
  }
`

const Inner = styled(FlexBox)`
  width: 100%;
  height: 100%;
`

const Name = styled.h3`
  text-align: center;
  font-size: 1.1em;
`

interface Props {
  label: string
  onClick: (id: string) => void
}

const ListItem: FunctionComponent<Props> = ({ label, onClick }) => (
  <AnimatedWrapper onClick={onClick}>
    <Inner justifyContent="center" alignItems="center">
      <Name>{label}</Name>
    </Inner>
  </AnimatedWrapper>
)

export default ListItem
