import { breadType } from '../actions/actionTypes'
import Stack from '../utils/stack'

const initBread = new Stack()
initBread.push({
  key: 1,
  name: '首页',
  path: '/',
  active: false
})

const breadReducer = (state = initBread, action) => {
  let data, payload, top, current, key

  switch (action.type) {

    //Push bread crumb
    case breadType['BREAD_PUSH']:
      data = state
      payload = action.payload
      //Change the prev crumb's active
      top = data.peek()
      if(top && !top.active)
        top.active = true
      //Add new crumb
      current = {
        key: data.length() + 1,
        name: payload.name,
        path: payload.path,
        active: payload.active
      }
      data.push(current)
      return data

    case breadType['BREAD_POP']:
      data = state
      data.pop()
      top = data.peek()
      if(top && top.active)
        top.active = false
      return data

    case breadType['BREAD_JUMP']:
      data = state
      payload = action.payload
      key = payload.key
      top = data.peek()
      while(top && (top.key > key)) {
        data.pop()
        top = data.peek()
      }
      if(top && top.active)
        top.active = false
      return data

    default:
      return state    
  }
}

export default breadReducer