import { createSelector } from 'reselect'
import { SERVICE_NAME } from './constants'
import { State } from 'ServicesTypes'

const getHouseState = (state: State) => state[SERVICE_NAME]

export const getIsHousesFetching = createSelector(
  [getHouseState],
  houseState => houseState.isFetching
)

export const getAreMoreHousesAvailable = createSelector(
  [getHouseState],
  houseState => houseState.isMoreAvailable
)

export const getHousesError = createSelector(
  [getHouseState],
  houseState => houseState.error
)

export const getAllHouses = createSelector(
  [getHouseState],
  houseState =>
    Object.keys(houseState.houses).map(name => houseState.houses[name])
)

export const getHouse = (state: State, { id }: { id: string }) =>
  getHouseState(state).houses[id]
