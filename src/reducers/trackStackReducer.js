import { trackStackType } from '../actions/actionTypes'
import Stack from '../utils/stack'

const initState = new Stack()

function changeVisit(data) {
  let top = data.active()
  top.data.visit = false
  let current = top.next
  while(current) {
    current.data.visit = true
    current = current.next
  }
}

const trackStackReducer = (state = initState, action) => {
  let data, payload, top

  switch(action.type) {

    case trackStackType['TRACK_STACK_PUSH']:
      data = state
      payload = action.payload
      top = data.peek()
      while(top && top.key != data.curr) {
        console.log(top.key)
        console.log(data.curr)
          top = data.pop()
      }
      data.push(payload)
      changeVisit(data)
      return data

    case trackStackType['TRACK_STACK_POINT']:
      data = state
      payload = action.payload
      data.pointAt(payload)
      changeVisit(data)
      return data

    default:
      return state
  }
}

export default trackStackReducer