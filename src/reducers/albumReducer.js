import { albumType } from '../actions/actionTypes'

const albumReducer = (state = [], action) => {
  let data, newAlbum

  switch (action.type) {

    //Get albums success
    //Return all valid albums of the specify category
    case albumType['ALBUM_GET_SUCCEEDED']:
      data = action.payload
      return [...data]

    //Add album success
    //Return new albums, include the current add one
    case albumType['ALBUM_SAVE_SUCCEEDED']:
      data = action.payload
      return [
        ...state,
        ...data
      ]

    //Update an album success,
    //then change the current albums with it
    case albumType['ALBUM_UPDATE_SUCCEEDED']:
      data = action.payload
      newAlbum = state.map(album => {
        if(album._key == data._key)
          return data
        else
          return album
      })
      return [
        ...newAlbum
      ]

    //Delete album success
    //Return new albums except the current remove one
    case albumType['ALBUM_DELETE_SUCCEEDED']:
      data = action.payload
      newAlbum = state.filter(album => album._key != data._key)
      return [...newAlbum]

    //Get or save or delete album(s) failed
    case albumType['ALBUM_GET_FAILED']:
    case albumType['ALBUM_SAVE_FAILED']:
    case albumType['ALBUM_UPDATE_FAILED']:
    case albumType['ALBUM_DELETE_FAILED']:
      console.log(action.message)
      return state

    default:
      return state    
  }
}

export default albumReducer