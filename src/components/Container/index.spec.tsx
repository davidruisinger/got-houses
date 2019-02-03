import 'jest-styled-components'
import React from 'react'
import testRenderer from 'react-test-renderer'
import Container from './index'

describe('<Container />', () => {
  const tree = testRenderer.create(<Container />).toJSON()
  it('matches the snapshot', () => {
    expect(tree).toMatchSnapshot()
  })
  it('has "text-align" set to "left"', () => {
    expect(tree).toHaveStyleRule('text-align', 'left')
  })
})

describe('<Container textAlign="right" />', () => {
  const tree = testRenderer.create(<Container textAlign="right" />).toJSON()
  it('matches the snapshot', () => {
    expect(tree).toMatchSnapshot()
  })
  it('has "text-align" set to "left"', () => {
    expect(tree).toHaveStyleRule('text-align', 'right')
  })
})

describe('<Container textAlign="center" />', () => {
  const tree = testRenderer.create(<Container textAlign="center" />).toJSON()
  it('matches the snapshot', () => {
    expect(tree).toMatchSnapshot()
  })
  it('has "text-align" set to "left"', () => {
    expect(tree).toHaveStyleRule('text-align', 'center')
  })
})
