import 'jest-styled-components'
import React from 'react'
import testRenderer from 'react-test-renderer'
import Hr from './index'

const tree = testRenderer.create(<Hr />).toJSON()

describe('<Hr />', () => {
  it('matches the snapshot', () => {
    expect(tree).toMatchSnapshot()
  })
})
