import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import categoryReducer from './categoryReducer'
import albumReducer from './albumReducer'
import photoReducer from './photoReducer'
import photoStateReducer from './photoStateReducer'
import tabReducer from './tabReducer'

const rootReducer = (history) => combineReducers({
  category: categoryReducer,
  albums: albumReducer,
  photos: photoReducer,
  photoState: photoStateReducer,
  tabKey: tabReducer,
  router: connectRouter(history)
})

export default rootReducer
