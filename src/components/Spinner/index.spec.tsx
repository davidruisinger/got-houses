import 'jest-styled-components'
import React from 'react'
import testRenderer from 'react-test-renderer'
import Spinner from './index'

const tree = testRenderer.create(<Spinner />).toJSON()

describe('<Spinner />', () => {
  it('matches the snapshot', () => {
    expect(tree).toMatchSnapshot()
  })
})
