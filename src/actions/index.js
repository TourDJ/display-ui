import { photoType } from './actionTypes'

//
export const photoGet = (key) => ({
  type: photoType['PHOTO_GET'],
  album: key
})

//
export const crumbDispatch = (dispatch, crumbSeed) => {
  dispatch({
    type: crumbSeed.breadType, 
    payload: crumbSeed.breadData
  })
  dispatch({
    type: crumbSeed.breadSizeType
  })   
}