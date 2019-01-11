import { albumCurrType } from '../actions/actionTypes'

const albumCurrReducer = (state = {}, action) => {
  let data

  switch (action.type) {

    case albumCurrType['ALBUM_CURRENT_GET_SUCCEEDED']:
    case albumCurrType['ALBUM_CURRENT_UPDATE_SUCCEEDED']:
      data = action.payload
      return data

    case albumCurrType['ALBUM_CURRENT_GET_FAILED']:
    case albumCurrType['ALBUM_CURRENT_UPDATE_FAILED']:
      console.log(action.message)
      return state

    default:
      return state 
  }
}

export default albumCurrReducer