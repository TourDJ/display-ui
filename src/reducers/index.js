import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import counterReducer from './counter'
import categoryReducer from './category_reducer'

const rootReducer = (history) => combineReducers({
  count: counterReducer,
  category: categoryReducer,
  router: connectRouter(history)
})

export default rootReducer
