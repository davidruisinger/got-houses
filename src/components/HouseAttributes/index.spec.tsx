import 'jest-styled-components'
import React from 'react'
import { shallow, mount } from 'enzyme'
import HouseAttributes from './index'
import HouseAttribute from '../HouseAttribute'
import { housesMock } from '../../services/house/_mocks'

describe('<HouseAttributes />', () => {
  const shallowedWraper = shallow(<HouseAttributes house={housesMock[0]} />)
  const mountedWrapper = mount(<HouseAttributes house={housesMock[0]} />)

  it('matches the snapshot', () => {
    expect(shallowedWraper).toMatchSnapshot()
  })

  it('renders 5 HouseAttribute components with correct props', () => {
    const attributeComponents = mountedWrapper.find(HouseAttribute)
    expect(attributeComponents.length).toBe(5)

    expect(attributeComponents.get(0).props.data).toEqual(
      housesMock[0].swornMembers.length.toString()
    )
    expect(attributeComponents.get(1).props.data).toEqual(housesMock[0].words)
    expect(attributeComponents.get(2).props.data).toEqual(
      housesMock[0].coatOfArms
    )
    expect(attributeComponents.get(3).props.data).toEqual(
      housesMock[0].seats.join(', ')
    )
    expect(attributeComponents.get(4).props.data).toEqual(
      housesMock[0].ancestralWeapons.join(', ')
    )
  })
})
