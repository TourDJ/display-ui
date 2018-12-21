import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import userReducer from './userReducer'
import categoryReducer from './categoryReducer'
import albumReducer from './albumReducer'
import albumStateReducer from './albumStateReducer'
import photoReducer from './photoReducer'
import photoStateReducer from './photoStateReducer'
import tabReducer from './tabReducer'
import trackCurrReducer from './trackCurrReducer'
import trackStackReducer from './trackStackReducer'

const rootReducer = (history) => combineReducers({
  user: userReducer,
  category: categoryReducer,
  albums: albumReducer,
  albumState: albumStateReducer,
  photos: photoReducer,
  photoState: photoStateReducer,
  tabKey: tabReducer,
  trackCurr: trackCurrReducer,
  trackStack: trackStackReducer,
  router: connectRouter(history)
})

export default rootReducer
