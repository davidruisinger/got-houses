import React, { FunctionComponent, ReactChild } from 'react'
import posed from 'react-pose'
import styled from '../_utils/styledComponents'
import FlexBox from '../FlexBox'
import Container from '../Container'

const animationProps = {
  enter: {
    x: 0,
    opacity: 1,
    delay: ({ i }: { i: number }) => i * 100,
    beforeChildren: true,
  },
  exit: { x: 50, opacity: 0 },
}

const AnimatedWrapper = posed(FlexBox)(animationProps)

const Icon = styled.div`
  font-size: 2.8em;
  padding: 0.2em;

  color: ${props => props.theme.text_default};
  background-color: ${props => props.theme.canvas_ground};
`

interface Props {
  icon: ReactChild
  data: string
  i?: number
}

const HouseAttribute: FunctionComponent<Props> = ({ icon, data, i }) => (
  <AnimatedWrapper i={i} justifyContent="space-between" alignItems="stretch">
    <Icon>{icon}</Icon>
    <Container>{data}</Container>
  </AnimatedWrapper>
)

HouseAttribute.defaultProps = {
  i: 1,
}

export default HouseAttribute
