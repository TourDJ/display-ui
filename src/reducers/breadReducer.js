import { breadType } from '../actions/actionTypes'
import crumbDefine from '../actions/crumbDefine'
import Stack from '../utils/stack'

const initBread = new Stack()
initBread.push(crumbDefine['/'])

function pushPathStack(crumbPath) {

}

const breadReducer = (state = initBread, action) => {
  let data, payload, top, current, key

  switch (action.type) {

    case breadType['BREAD_SET']:
      data = state
      payload = action.payload
      top = data.peek()
      let diff = top.level - payload.level
      if(diff < 0) {
        //forward
        let pathStack = pushPathStack(payload.path)
        let temp = pathStack.pop()
        while(temp) {
          data.push(temp)
          temp = pathStack.pop()
        }
        if(top && top.active)
          top.active = false
      } else {
        //backward
        while(diff > 0) {
          data.pop()
          top = data.peek()
          diff--
        }
        if(top && top.active)
          top.active = false
      }
      return

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