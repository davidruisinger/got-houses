import React, { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'
import styled from '../_utils/styledComponents'
import Container from '../Container'

interface Props {
  title?: string
}

const Wrapper = styled.div`
  width: 100%;
`

const Layout: FunctionComponent<Props> = ({ children, title }) => (
  <Wrapper>
    <Helmet>
      <title>GOT Houses | {title}</title>
    </Helmet>
    <Container as="main">{children}</Container>
  </Wrapper>
)

Layout.defaultProps = {
  title: '',
}

export default Layout
