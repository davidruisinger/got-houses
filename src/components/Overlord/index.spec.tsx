import 'jest-styled-components'
import React from 'react'
import { shallow, mount } from 'enzyme'
import Overlord from './index'
import { housesMock } from '../../services/house/_mocks'

describe('<Overlord />', () => {
  const mockClick = jest.fn()
  const shallowedWraper = shallow(
    <Overlord overlord={housesMock[0]} onClick={mockClick} />
  )
  const mountedWrapper = mount(
    <Overlord overlord={housesMock[0]} onClick={mockClick} />
  )

  it('matches the snapshot', () => {
    expect(shallowedWraper).toMatchSnapshot()
  })

  it('renders the name', () => {
    expect(
      mountedWrapper
        .find('h3')
        .first()
        .text()
    ).toEqual(housesMock[0].name)
  })

  it('handles clicks', () => {
    shallowedWraper.simulate('click')
    expect(mockClick).toHaveBeenCalledTimes(1)
  })
})
