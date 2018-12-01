import { pictureType } from '../actions/actionTypes'

const initialState = []

const pictureReducer = (state = initialState, action) => {
  let data

  switch (action.type) {

    case pictureType['PICTURE_GET_SUCCEEDED']:
      data = action.payload
      return [...data]

    case pictureType['PICTURE_GET_FAILED']:
      console.log(action.message)
      return state

    case pictureType['PICTURE_VIEW']:

      return state

    default:
      return state
  }
}

export default pictureReducer