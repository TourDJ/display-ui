import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import categoryReducer from './category_reducer'
import albumReducer from './album_reducer'

const rootReducer = (history) => combineReducers({
  category: categoryReducer,
  albums: albumReducer,
  router: connectRouter(history)
})

export default rootReducer
