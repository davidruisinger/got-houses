import 'jest-styled-components'
import React from 'react'
import testRenderer from 'react-test-renderer'
import Card from './index'

const tree = testRenderer.create(<Card />).toJSON()

describe('<Card />', () => {
  it('matches the snapshot', () => {
    expect(tree).toMatchSnapshot()
  })
})
