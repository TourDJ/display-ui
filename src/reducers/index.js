import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import categoryReducer from './category_reducer'
import albumReducer from './album_reducer'
import pictureReducer from './picture_reducer'

const rootReducer = (history) => combineReducers({
  category: categoryReducer,
  albums: albumReducer,
  pictures: pictureReducer,
  router: connectRouter(history)
})

export default rootReducer
