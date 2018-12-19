import { trackStackType } from '../actions/actionTypes'
import Stack from '../utils/stack'

const initState = new Stack()

const trackStackReducer = (state = initState, action) => {
  let data, payload, top

  switch(action.type) {

    case trackStackType['TRACK_STACK_PUSH']:
      data = state
      payload = action.payload
      top = data.peek()
      while(top && top.key != data.key) {
          top = data.pop()
      }
      data.push(payload)
      return data

    case trackStackType['TRACK_STACK_POINT']:
      data = state
      payload = action.payload
      data.pointAt(payload)
      return data

    default:
      return state
  }
}

export default trackStackReducer