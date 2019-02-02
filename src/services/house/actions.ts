import { createAction } from 'typesafe-actions'
import { House } from './types'

/**
 * Redux action to fetch houses.
 * @param {Object} config
 * @param {number} config.page - The page that should be fetched
 * @param {number} config.pageSize - The size of one page
 */
export const fetchHouses = createAction('GET_HOUSES_REQUEST', resolve => {
  return ({ pageSize = 10 }: { pageSize: number }) => resolve({ pageSize })
})

/**
 * Redux action to fetch a single house by ID.
 * @param {Object} config
 * @param {number} config.id - The ID of the house
 */
export const fetchHouseById = createAction(
  'GET_HOUSE_BY_ID_REQUEST',
  resolve => {
    return ({ id }: { id: string }) => resolve({ id })
  }
)

/**
 * Redux action to process an array of fetched houses.
 * @param {Object} result
 * @param {string} result.houses - The fetched houses.
 */
export const fetchHousesSuccess = createAction(
  'GET_HOUSES_SUCCESS',
  resolve => {
    return ({
      houses,
      isMoreAvailable,
    }: {
      houses: House[]
      isMoreAvailable: boolean | 'skip' // If skip is provided the reducer will ignore this (used for single fetches)
    }) => resolve({ houses, isMoreAvailable })
  }
)

/**
 * Redux action to process an error while fetching houses.
 * @param {Object} error
 * @param {string} error.message - The error message.
 */
export const fetchHousesFail = createAction('GET_HOUSES_FAIL', resolve => {
  return ({ message }: { message: string }) => resolve({ message })
})
