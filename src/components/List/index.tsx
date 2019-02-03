import React, { FunctionComponent } from 'react'
import styled from '../_utils/styledComponents'
import mediaQuery from '../_utils/mediaQuery'

// Inspired by https://medium.com/cloudaper/how-to-create-a-flexible-square-grid-with-css-grid-layout-ea48baf038f3
const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 1em 1em;

  ${mediaQuery.sm`
    grid-template-columns: repeat(3, 1fr);
  `}
  ${mediaQuery.md`
    grid-template-columns: repeat(4, 1fr);
  `}

  ::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`

const List: FunctionComponent<{}> = ({ children }) => (
  <Wrapper>{children}</Wrapper>
)

export default List
