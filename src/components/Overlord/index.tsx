import React, { FunctionComponent } from 'react'
import posed from 'react-pose'
import { GiCrown } from 'react-icons/gi'
import { MdArrowForward } from 'react-icons/md'
import styled from '../_utils/styledComponents'
import { House } from '../../services/house/types'
import FlexBox from '../FlexBox'

const animationProps = {
  hoverable: true,
  init: {
    x: 0,
  },
  hover: {
    x: 10,
  },
}

const Wrapper = styled.div`
  width: 100%;
  background: ${props => props.theme.canvas_first};
`

const AnimatedInner = styled(posed(FlexBox)(animationProps))`
  width: 100%;
  padding: 0.5em;
  box-sizing: border-box;
  cursor: pointer;
`

const Name = styled.h3`
  text-align: center;
  font-size: 1.1em;
  margin: 0 1em;
`

const ArrowIcon = posed.div({
  init: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
  },
})

interface Props {
  overlord: House
  onClick: (id: string) => void
}

const Overlord: FunctionComponent<Props> = ({ overlord, onClick }) => (
  <Wrapper onClick={() => onClick(overlord.id)}>
    <AnimatedInner justifyContent="center" alignItems="center">
      <GiCrown size="2em" />
      <Name>{overlord.name}</Name>
      <ArrowIcon>
        <MdArrowForward size="2em" />
      </ArrowIcon>
    </AnimatedInner>
  </Wrapper>
)

export default Overlord
