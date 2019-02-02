import styled from '../_utils/styledComponents'
import { MEDIA_BREAKPOINTS } from '../_utils/mediaQuery'

interface Props {
  textAlign?: 'left' | 'right' | 'center'
}

const Container = styled.div<Props>`
  width: 100%;
  max-width: ${MEDIA_BREAKPOINTS.lg}px;
  margin: 0 auto;
  padding: 1em;
  box-sizing: border-box;
  overflow: hidden;
  text-align: ${props => props.textAlign};
`

Container.defaultProps = {
  textAlign: 'left',
}

export default Container
