import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import HouseHeader from './index'
import { housesMock } from '../../services/house/_mocks'

describe('<HouseHeader />', () => {
  const mockClick = jest.fn()
  const wrapper = shallow(
    <HouseHeader house={housesMock[0]} onBack={mockClick} />
  )

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('renders the name, region & titles', () => {
    expect(
      wrapper
        .find('h1')
        .first()
        .text()
    ).toEqual(housesMock[0].name)

    expect(
      wrapper
        .find('h3')
        .first()
        .text()
    ).toContain(housesMock[0].region)

    expect(
      wrapper
        .find('h4')
        .first()
        .text()
    ).toEqual(housesMock[0].titles.join(', '))
  })

  it('handles clicks on back button', () => {
    wrapper.find('Styled(MdArrowBack)').simulate('click')
    expect(mockClick).toHaveBeenCalledTimes(1)
  })
})
