import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import counterReducer from './counter'

const reducer = (history) => combineReducers({
	count: counterReducer,
  router: connectRouter(history)
})

export default reducer