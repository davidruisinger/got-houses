import { getType } from 'typesafe-actions'
import {
  put,
  takeLatest,
  call,
  select,
  delay,
  takeEvery,
} from 'redux-saga/effects'
import { BASE_URL } from './constants'
import { House } from './types'
import { getAllHouses } from './selectors'
import * as actions from './actions'

export function* fetchHousesSaga(
  action: ReturnType<typeof actions.fetchHouses>
) {
  try {
    yield delay(2000)
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
    yield delay(2000)
    const { id } = action.payload
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
