import { albumType } from '../actions/actionTypes'

const initialState = 0

const albumStateReducer = (state = initialState, action) => {

  switch (action.type) {

    case albumType['ALBUM_INITIAL_STATE']:
      return 0

    case albumType['ALBUM_SUCCEES_STATE']:
      return 1

    case albumType['ALBUM_FAILE_STATE']:
      return -1

    default:
      return state
  }
}

export default albumStateReducer