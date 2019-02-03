import 'jest-styled-components'
import React from 'react'
import testRenderer from 'react-test-renderer'
import _get from 'lodash.get'
import List from './index'

const tree = testRenderer
  .create(
    <List>
      <span>Test child 1</span>
      <span>Test child 2</span>
    </List>
  )
  .toJSON()

describe('<List />', () => {
  it('matches the snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('renders the children', () => {
    expect(_get(tree, 'children')).toHaveLength(2)
    expect(_get(tree, 'children[0].type')).toEqual('span')
    expect(_get(tree, 'children[1].type')).toEqual('span')
    expect(_get(tree, 'children[0].children[0]')).toEqual('Test child 1')
    expect(_get(tree, 'children[1].children[0]')).toEqual('Test child 2')
  })
})
