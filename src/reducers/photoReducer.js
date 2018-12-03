import { photoType } from '../actions/actionTypes'

const initialState = []

const photoReducer = (state = initialState, action) => {
  let data

  switch (action.type) {

    case photoType['PHOTO_GET_SUCCEEDED']:
      data = action.payload
      return [...data]

    case photoType['PHOTO_GET_FAILED']:
      console.log(action.message)
      return state

    case photoType['PHOTO_SAVE_SUCCEEDED']:
      data = action.payload
      return [
        ...state,
        ...data
      ]

    case photoType['PHOTO_SAVE_FAILED']:
      console.log(action.message)
      return state

    case photoType['PHOTO_VIEW']:

      return state

    default:
      return state
  }
}

export default photoReducer