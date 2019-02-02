import styled from '../_utils/styledComponents'

interface Props {
  width?: string
}

const Hr = styled.hr<Props>`
  border: 0;
  background-color: ${props => props.theme.ancient_ivory};
  height: 1px;
  width: ${props => props.width};
`

Hr.defaultProps = {
  width: '100%',
}

export default Hr
