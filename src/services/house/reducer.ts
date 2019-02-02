import { ActionType, getType } from 'typesafe-actions'
import * as actions from './actions'
import { House } from './types'

export type Houses = { [id: string]: House }

export type HouseState = Readonly<{
  houses: Houses
  isFetching: boolean
  isMoreAvailable: boolean
  error: null | string
}>

const initialState: HouseState = {
  houses: {},
  isFetching: false,
  isMoreAvailable: true,
  error: null,
}

export default (
  state: HouseState = initialState,
  action: ActionType<typeof actions>
): HouseState => {
  switch (action.type) {
    case getType(actions.fetchHouses):
    case getType(actions.fetchHouseById):
      return {
        ...state,
        isFetching: true,
        error: null,
      }

    case getType(actions.fetchHousesSuccess):
      // Normalize the array to an object
      const normalizedHouses: {
        [id: string]: House
      } = action.payload.houses.reduce((obj: Houses, house) => {
        // There is no ID field so we need to get the ID from the url
        const id = house.url.split('/').pop()
        // We also transform the URL for the potentially set overlord into an ID
        const overlordId = house.overlord.split('/').pop() || ''
        if (id) obj[id] = { ...house, id, overlordId }

        return obj
      }, {})
      const isMoreAvailable = action.payload.isMoreAvailable

      return {
        ...state,
        houses: {
          ...state.houses,
          ...normalizedHouses,
        },
        isMoreAvailable:
          isMoreAvailable == 'skip' ? state.isMoreAvailable : isMoreAvailable,
        isFetching: false,
      }

    case getType(actions.fetchHousesFail):
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      }

    default:
      return state
  }
}
