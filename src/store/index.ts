import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import rootReducer from '../services/reducer'
import rootSaga from '../services/sagas'

const bindMiddleware = (middleware: SagaMiddleware<any>[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]))
sagaMiddleware.run(rootSaga)

export default store
