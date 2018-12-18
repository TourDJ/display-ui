import { trackStackType } from '../actions/actionTypes'
import Stack from '../utils/stack'

const initState = new Stack()

const trackStackReducer = (state = initState, action) => {
  let newState, payload

  switch(action.type) {

    case trackStackType['TRACK_STACK_PUSH']:
      newState = state
      payload = action.payload
      newState.push(payload)
      return newState

    default:
      return state
  }
}

export default trackStackReducer