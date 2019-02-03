import 'jest-styled-components'
import React from 'react'
import { shallow, mount } from 'enzyme'
import HouseAttribute from './index'
import { GiCrossedSwords } from 'react-icons/gi'

describe('<HouseAttribute />', () => {
  const data = 'Test data string'
  const shallowedWraper = shallow(
    <HouseAttribute icon={<GiCrossedSwords />} data={data} />
  )
  const mountedWrapper = mount(
    <HouseAttribute icon={<GiCrossedSwords />} data={data} />
  )

  it('matches the snapshot', () => {
    expect(shallowedWraper).toMatchSnapshot()
  })

  it('renders the icon', () => {
    expect(mountedWrapper.find(GiCrossedSwords).length).toBe(1)
  })

  it('renders the data', () => {
    expect(
      mountedWrapper
        .find('p')
        .first()
        .text()
    ).toEqual(data)
  })
})
