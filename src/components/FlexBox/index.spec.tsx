import 'jest-styled-components'
import React from 'react'
import testRenderer from 'react-test-renderer'
import FlexBox from './index'

describe('<FlexBox />', () => {
  const tree = testRenderer.create(<FlexBox />).toJSON()
  it('matches the snapshot', () => {
    expect(tree).toMatchSnapshot()
  })
  it('has the correct default props', () => {
    expect(tree).toHaveStyleRule('align-items', 'stretch')
    expect(tree).toHaveStyleRule('align-content', 'stretch')
    expect(tree).toHaveStyleRule('flex-direction', 'row')
    expect(tree).toHaveStyleRule('justify-content', 'flex-start')
    expect(tree).toHaveStyleRule('flex-wrap', 'nowrap')
  })
})

describe('<FlexBox ...customProps />', () => {
  const tree = testRenderer
    .create(
      <FlexBox
        alignItems="center"
        alignContent="center"
        direction="column"
        justifyContent="center"
        wrap="wrap"
      />
    )
    .toJSON()
  it('matches the snapshot', () => {
    expect(tree).toMatchSnapshot()
  })
  it('has the correct custom props', () => {
    expect(tree).toHaveStyleRule('align-items', 'center')
    expect(tree).toHaveStyleRule('align-content', 'center')
    expect(tree).toHaveStyleRule('flex-direction', 'column')
    expect(tree).toHaveStyleRule('justify-content', 'center')
    expect(tree).toHaveStyleRule('flex-wrap', 'wrap')
  })
})
