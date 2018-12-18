import { breadSizeType } from '../actions/actionTypes'
import crumbDefine from '../actions/crumbDefine'

const initState = crumbDefine['/'].key

const breadSizeReducer = (state = initState, action) => {
  let newState

  switch(action.type) {

    case breadSizeType['BREAD_SIZE_SET']:
      newState = action.payload
      return newState

    case breadSizeType['BREAD_SIZE_ADD']:
      newState = state + 1
      return newState

    case breadSizeType['BREAD_SIZE_MINUS']:
      newState = state - 1
      if(newState < 1)
        newState = 1
      return newState

    case breadSizeType['BREAD_SIZE_JUMP']:
      newState = action.payload
      return newState

    default:
      return state
  }
}

export default breadSizeReducer