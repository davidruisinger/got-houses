import { all } from 'redux-saga/effects'

import houseSagas from './house/sagas'

export default function* rootSaga() {
  yield all([...houseSagas])
}
