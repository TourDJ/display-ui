import { photoType, breadSizeType } from './actionTypes'
import crumbDefine from './crumbDefine'

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

// export const breadSizeDispatch = (dispatch, module) => {
//   let breadSize = crumbDefine[module].key
//   dispatch({
//     type: breadSizeType['BREAD_SIZE_SET'],
//     payload: breadSize
//   })
// }