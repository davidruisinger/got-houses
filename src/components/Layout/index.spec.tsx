import 'jest-styled-components'
import React from 'react'
import { Helmet } from 'react-helmet'
import { mount } from 'enzyme'
import Layout from './index'

describe('<Layout />', () => {
  it('sets the correct title', () => {
    mount(<Layout title="Test title" />)
    const helmet = Helmet.peek()
    // @ts-ignore
    expect(helmet.title.join('')).toEqual('GOT Houses | Test title')
  })
})
