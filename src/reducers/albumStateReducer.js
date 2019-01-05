import { albumStateType } from '../actions/actionTypes'

const initialState = 0

const albumStateReducer = (state = initialState, action) => {

  switch (action.type) {

    case albumStateType['ALBUM_INITIAL_STATE']:
      return 0

    case albumStateType['ALBUM_SUCCEES_STATE']:
      return 1

    case albumStateType['ALBUM_FAILE_STATE']:
      return -1

    default:
      return state
  }
}

export default albumStateReducer