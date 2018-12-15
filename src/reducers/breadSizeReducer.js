import { breadSizeType } from '../actions/actionTypes'

const breadSizeReducer = (state = 1, action) => {
  let newState

  switch(action.type) {

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