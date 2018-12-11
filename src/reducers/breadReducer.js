import { breadType } from '../actions/actionTypes'

const breadReducer = (state = [], action) => {

  switch (action.type) {

    //
    case breadType['BREAD_CRUMB']:
      let data = action.payload
      return [...data]

    default:
      return state    
  }
}

export default breadReducer