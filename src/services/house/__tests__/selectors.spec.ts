import { SERVICE_NAME } from '../constants'
import * as selectors from '../selectors'
import rootReducer from '../../reducer'
import { houseStateMock, housesMock } from '../_mocks'

const initialState = rootReducer(undefined, {} as any)

const stateMock = {
  ...initialState,
  [SERVICE_NAME]: {
    ...houseStateMock,
    houses: {
      '1': { ...housesMock[0], name: 'Test House 1' },
      '2': { ...housesMock[0], name: 'Test House 3' },
      '3': { ...housesMock[0], name: 'Test House 3' },
    },
  },
}

describe('house selectors', () => {
  describe('getIsHousesFetching', () => {
    it('should return a boolean representing the fetching state', () => {
      const selected = selectors.getIsHousesFetching(stateMock)
      expect(selected).toEqual(houseStateMock.isFetching)
    })
  })

  describe('getAreMoreHousesAvailable', () => {
    it('should return a boolean representing availability of more houses', () => {
      const selected = selectors.getAreMoreHousesAvailable(stateMock)
      expect(selected).toEqual(houseStateMock.isMoreAvailable)
    })
  })

  describe('getHousesError', () => {
    it('should return the error', () => {
      const selected = selectors.getHousesError(stateMock)
      expect(selected).toEqual(houseStateMock.error)
    })
  })

  describe('getAllHouses', () => {
    it('should return all houses', () => {
      const selected = selectors.getAllHouses(stateMock)
      expect(selected).toHaveLength(3)
      expect(selected).toContainEqual(stateMock[SERVICE_NAME].houses['1'])
    })
  })

  describe('getHouse', () => {
    it('should return a single house', () => {
      const selected = selectors.getHouse(stateMock, {
        id: '1',
      })
      expect(selected).toEqual(stateMock[SERVICE_NAME].houses['1'])
    })
  })

  it('should return undefied if a house is not in store', () => {
    const selected = selectors.getHouse(stateMock, {
      id: 'Non existent ID',
    })
    expect(selected).toBeUndefined()
  })

  it('should not break if id is missing', () => {
    const selected = selectors.getHouse(stateMock, {
      // @ts-ignore
      id: undefined,
    })
    expect(selected).toBeUndefined()
  })
})
