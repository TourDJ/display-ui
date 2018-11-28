import { albumType } from '../actions/actionTypes'

const albumReducer = (state = [], action) => {
  let data

  switch (action.type) {
    case albumType['ALBUM_SAVE_SUCCEEDED']:
      data = action.payload
      return [...data]

    case albumType['ALBUM_SAVE_FAILED']:
      console.log(action.message)
      return state

    //Get albums success
    case albumType['ALBUM_GET_SUCCEEDED']:
      data = action.payload
      return [...data]

    //Get albums failed
    case albumType['ALBUM_GET_FAILED']:
      console.log(action.message)
      return state      

    default:
      return state    
  }
}

export default albumReducer