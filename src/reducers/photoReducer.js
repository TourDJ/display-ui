import { photoType } from '../actions/actionTypes'

//The initial state of photo data flow
const initialState = []

/**
* Photo reducer for all photo's operate, include retrieve,
* add, edit, delete and so on.
**/
const photoReducer = (state = initialState, action) => {
  let data, newPhoto

  switch (action.type) {

    //Get photos success, return current photos
    case photoType['PHOTO_GET_SUCCEEDED']:
      data = action.payload
      return [...data]

    //Save a photo success, 
    //then add it to current photos
    case photoType['PHOTO_SAVE_SUCCEEDED']:
      data = action.payload
      return [
        ...state,
        ...data
      ]

    //Update a photo success,
    //then change the current photos with it
    case photoType['PHOTO_UPDATE_SUCCEEDED']:
      data = action.payload
      newPhoto = state.map(photo => {
        if(photo._key == data._key)
          return data
        else
          return photo
      })
      return [
        ...newPhoto
      ]

    //Delete a photo success,
    //then also remove it from current photos
    case photoType['PHOTO_DELETE_SUCCEEDED']:
      data = action.payload
      newPhoto = state.filter(photo => photo._key != data._key)
      return [
        ...newPhoto
      ]

    //All operate failed, deal together
    //The deal is output the error,
    //and return the origin data
    case photoType['PHOTO_GET_FAILED']:
    case photoType['PHOTO_SAVE_FAILED']:
    case photoType['PHOTO_UPDATE_FAILED']:
    case photoType['PHOTO_DELETE_FAILED']:
      console.log(action.message)
      return state

    default:
      return state
  }
}

export default photoReducer