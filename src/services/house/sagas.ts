import { getType } from 'typesafe-actions'
import { put, takeLatest, call, select, takeEvery } from 'redux-saga/effects'
import { BASE_URL } from './constants'
import { House } from './types'
import { getAllHouses, getHouse } from './selectors'
import * as actions from './actions'

export function* fetchHousesSaga(
  action: ReturnType<typeof actions.fetchHouses>
) {
  try {
    const { pageSize } = action.payload
    // Since this method should only allow continiously fetch more and more houses,
    // we only need the pageSize to be passed in.
    // The actual page that is required to fetch the next products
    // is calculated based on the existing items in the store
    const existingHouses = yield select(getAllHouses)
    // NOTE: It's okay if there is an overlap where we would fetch some houses that are
    // already in the store since the reducer prevents having duplicates
    const page = Math.floor(existingHouses.length / pageSize) + 1
    const response: Response = yield call(
      fetch,
      `${BASE_URL}?page=${page}&pageSize=${pageSize}`
    )
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const json: House[] = yield call([response, response.json])
    const isMoreAvailable =
      (response.headers.get('link') || '').indexOf('rel="next"') !== -1
    yield put(actions.fetchHousesSuccess({ houses: json, isMoreAvailable }))
  } catch (e) {
    yield put(
      actions.fetchHousesFail({
        message: e.message || 'Unknown error',
      })
    )
  }
}

export function* fetchHouseByIdSaga(
  action: ReturnType<typeof actions.fetchHouseById>
) {
  try {
    const { id } = action.payload
    // Check if the house is already available in the store
    const existingHouse = yield select(getHouse, { id })
    if (existingHouse)
      // We don't need to fecth the house again and can resolce with an empty array
      yield put(
        actions.fetchHousesSuccess({ houses: [], isMoreAvailable: 'skip' })
      )
    const response: Response = yield call(fetch, `${BASE_URL}/${id}`)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const json: House = yield call([response, response.json])
    yield put(
      actions.fetchHousesSuccess({ houses: [json], isMoreAvailable: 'skip' })
    )
  } catch (e) {
    yield put(
      actions.fetchHousesFail({
        message: e.message || 'Unknown error',
      })
    )
  }
}

export default [
  takeLatest(getType(actions.fetchHouses), fetchHousesSaga),
  takeEvery(getType(actions.fetchHouseById), fetchHouseByIdSaga),
]
