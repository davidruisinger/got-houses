import { combineReducers } from 'redux'

// Import each service reducer and it's name
import { SERVICE_NAME as houseServiceName } from './house/constants'
import HouseReducer from './house/reducer'

const rootReducer = combineReducers({
  [houseServiceName]: HouseReducer,
})

export default rootReducer
