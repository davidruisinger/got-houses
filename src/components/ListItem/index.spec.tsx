import 'jest-styled-components'
import React from 'react'
import { shallow, mount } from 'enzyme'
import ListItem from './index'

describe('<ListItem />', () => {
  const label = 'Test label'
  const mockClick = jest.fn()
  const shallowedWraper = shallow(
    <ListItem label={label} onClick={mockClick} />
  )
  const mountedWrapper = mount(<ListItem label={label} onClick={mockClick} />)

  it('matches the snapshot', () => {
    expect(shallowedWraper).toMatchSnapshot()
  })

  it('renders the label', () => {
    expect(
      mountedWrapper
        .find('h3')
        .first()
        .text()
    ).toEqual(label)
  })

  it('handles clicks', () => {
    shallowedWraper.simulate('click')
    expect(mockClick).toHaveBeenCalledTimes(1)
  })
})
