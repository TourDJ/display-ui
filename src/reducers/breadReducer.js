import { breadType } from '../actions/actionTypes'

const breadReducer = (state = [], action) => {

  switch (action.type) {

    //Push bread crumb
    case breadType['BREAD_PUSH']:
      let data = action.payload
      return [...data]

    case breadType['BREAD_POP']:

      return state

    case breadType['BREAD_DUMP']:

      return state

    default:
      return state    
  }
}

export default breadReducer