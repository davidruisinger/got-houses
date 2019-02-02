import React from 'react'
import styled, { keyframes, css } from '../_utils/styledComponents'
import FlexBox from '../FlexBox'

const DOT_SIZE = 6

const bounceAnimation = () =>
  keyframes`
    0% {
      transform: translateY(-${DOT_SIZE}px); 
    }

    50% {
      transform: translateY(${DOT_SIZE}px);
    }

    100% {
      transform: translateY(-${DOT_SIZE}px);    }
  `

interface DotProps {
  delay: string
}

const Wrapper = styled(FlexBox)`
  height: calc(${DOT_SIZE}px * 3);
`

const Dot = styled.div<DotProps>`
  background-color: ${props => props.theme.ancient_ivory};
  border-radius: 50%;
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  margin: 0 ${DOT_SIZE / 2}px;
  /* Animation */
  animation: ${() =>
    css`
      ${bounceAnimation()} 1s ease-in-out infinite;
    `};
  animation-delay: ${props => props.delay};
`

const Spinner = () => (
  <Wrapper direction="row" justifyContent="center" alignItems="center">
    <Dot delay="0s" />
    <Dot delay="-0.9s" />
    <Dot delay="-0.8s" />
  </Wrapper>
)

export default Spinner
