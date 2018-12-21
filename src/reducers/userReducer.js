import { userType } from '../actions/actionTypes'

//
const initialState = {}

//
const userReducer = (state = initialState, action) => {

  switch (action.type) {

    //Get photos success, return current photos
    case userType['USER_GET_SUCCEEDED']:
      let data = action.payload
      return data

    case userType['USER_GET_FAILED']:
      console.log(action.message)
      return state

    default:
      return state
  }
}

export default userReducer      