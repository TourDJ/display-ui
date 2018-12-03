import { photoType } from '../actions/actionTypes'

const initialState = 0

const photoStateReducer = (state = initialState, action) => {

  switch (action.type) {

    case photoType['PHOTO_INITIAL_STATE']:
      return 0

    case photoType['PHOTO_SUCCEES_STATE']:
      return 1

    case photoType['PHOTO_FAILE_STATE']:
      return -1

    default:
      return state
  }
}

export default photoStateReducer