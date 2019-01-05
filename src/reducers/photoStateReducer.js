import { photoStateType } from '../actions/actionTypes'

const initialState = 0

const photoStateReducer = (state = initialState, action) => {

  switch (action.type) {

    case photoStateType['PHOTO_INITIAL_STATE']:
      return 0

    case photoStateType['PHOTO_SUCCEES_STATE']:
      return 1

    case photoStateType['PHOTO_FAILE_STATE']:
      return -1

    default:
      return state
  }
}

export default photoStateReducer