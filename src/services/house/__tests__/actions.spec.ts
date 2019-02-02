import * as actions from '../actions'
import { housesMock } from '../_mocks'

describe('house service actions', () => {
  it('should create an action to fetch houses', () => {
    const pageSize = 4
    const expectedAction = {
      type: 'GET_HOUSES_REQUEST',
      payload: {
        pageSize,
      },
    }
    expect(actions.fetchHouses({ pageSize })).toEqual(expectedAction)
  })

  it('should create an action to fetch a single house by ID', () => {
    const id = '1'
    const expectedAction = {
      type: 'GET_HOUSE_BY_ID_REQUEST',
      payload: {
        id,
      },
    }
    expect(actions.fetchHouseById({ id })).toEqual(expectedAction)
  })

  it('should create an action to process an array of fetched houses', () => {
    const expectedAction = {
      type: 'GET_HOUSES_SUCCESS',
      payload: {
        houses: housesMock,
        isMoreAvailable: true,
      },
    }
    expect(
      actions.fetchHousesSuccess({ houses: housesMock, isMoreAvailable: true })
    ).toEqual(expectedAction)
  })

  it('should create an action to process an error while fetching houses', () => {
    const message = 'Test error'
    const expectedAction = {
      type: 'GET_HOUSES_FAIL',
      payload: {
        message,
      },
    }
    expect(actions.fetchHousesFail({ message })).toEqual(expectedAction)
  })
})
