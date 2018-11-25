import { albumType } from '../actions/actionTypes'

const albumReducer = (state = false, action) => {
  switch (action.type) {
    case albumType['ALBUM_SAVE_SUCCEEDED']:
      let flag = action.payload['flag']
      return {
        albumFlag: flag
      }

    case albumType['ALBUM_SAVE_FAILED']:
      return action.message

    default:
      return state    
  }
}

export default albumReducer