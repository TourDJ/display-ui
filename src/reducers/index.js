import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import categoryReducer from './categoryReducer'
import albumReducer from './albumReducer'
import albumStateReducer from './albumStateReducer'
import photoReducer from './photoReducer'
import photoStateReducer from './photoStateReducer'
import tabReducer from './tabReducer'
import breadReducer from './breadReducer'
// import breadSizeReducer from './breadSizeReducer'
import trackStackReducer from './trackStackReducer'

const rootReducer = (history) => combineReducers({
  category: categoryReducer,
  albums: albumReducer,
  albumState: albumStateReducer,
  photos: photoReducer,
  photoState: photoStateReducer,
  tabKey: tabReducer,
  bread: breadReducer,
  // breadSize: breadSizeReducer,
  trackStack: trackStackReducer,
  router: connectRouter(history)
})

export default rootReducer
