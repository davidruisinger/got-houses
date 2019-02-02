import reducer, { HouseState } from '../reducer'
import * as actions from '../actions'
import { housesMock } from '../_mocks'

const initialState = reducer(undefined, {} as any)

describe('house service reducer', () => {
  describe('initial state', () => {
    it('should match the snapshot', () => {
      expect(initialState).toMatchSnapshot()
    })
  })

  let fetchingState: HouseState,
    successState: HouseState,
    errorState: HouseState
  describe('fetchHouses action', () => {
    it('should set isFetching', () => {
      const action = actions.fetchHouses({
        pageSize: 4,
      })
      fetchingState = reducer(initialState, action)
      expect(fetchingState.isFetching).toBeTruthy()
    })
  })

  describe('fetchHouseById action', () => {
    it('should set isFetching', () => {
      const action = actions.fetchHouseById({
        id: '1',
      })
      fetchingState = reducer(initialState, action)
      expect(fetchingState.isFetching).toBeTruthy()
    })
  })

  describe('fetchHousesSuccess action', () => {
    it('should unset isFetching and set the houses', () => {
      const action = actions.fetchHousesSuccess({
        houses: housesMock,
        isMoreAvailable: true,
      })
      successState = reducer(fetchingState, action)
      expect(successState.isFetching).toBeFalsy()
      const id = housesMock[0].url.split('/').pop()
      expect(successState.houses).toEqual({
        // @ts-ignore
        [id]: housesMock[0],
      })
    })

    it('should only add new houses to an existing list of houses', () => {
      const modifiedHouse = {
        ...housesMock[0],
        url: 'https://www.anapioficeandfire.com/api/houses/2',
        id: '2',
      }
      const modifiedHousesMocks = [
        housesMock[0], // This should not be added a second time
        modifiedHouse,
      ]
      const action = actions.fetchHousesSuccess({
        houses: modifiedHousesMocks,
        isMoreAvailable: true,
      })
      successState = reducer(successState, action)
      expect(Object.keys(successState.houses)).toHaveLength(2)
      const id = housesMock[0].url.split('/').pop()
      // @ts-ignore
      expect(successState.houses[id]).toEqual(housesMock[0])
      expect(successState.houses['2']).toEqual(modifiedHouse)
    })

    it('should skip setting isMoreAvailable if requested', () => {
      expect(successState.isMoreAvailable).toBeTruthy()
      const action = actions.fetchHousesSuccess({
        houses: [],
        isMoreAvailable: 'skip',
      })
      successState = reducer(successState, action)
      expect(successState.isMoreAvailable).toBeTruthy()
    })

    it('should set isMoreAvailable to false when there is nothing more to fetch', () => {
      expect(successState.isMoreAvailable).toBeTruthy()
      const action = actions.fetchHousesSuccess({
        houses: [],
        isMoreAvailable: false,
      })
      successState = reducer(successState, action)
      expect(successState.isMoreAvailable).toBeFalsy()
    })
  })

  describe('fetchHousesFail action', () => {
    it('should unset isFetching and set an error', () => {
      const errorMessage = 'Test error'
      const action = actions.fetchHousesFail({ message: 'Test error' })
      errorState = reducer(fetchingState, action)
      expect(errorState.isFetching).toBeFalsy()
      expect(errorState.error).toBe(errorMessage)
    })
  })

  describe('fetchHouses action', () => {
    it('should set isFetching and clear the error when re-trying', () => {
      const action = actions.fetchHouses({
        pageSize: 4,
      })
      const retryState = reducer(errorState, action)
      expect(retryState.isFetching).toBeTruthy()
      expect(retryState.error).toBe(null)
    })
  })
})
