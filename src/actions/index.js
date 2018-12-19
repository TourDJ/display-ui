import { photoType, trackCurrType, trackStackType } from './actionTypes'
import crumbDefine from './crumbDefine'

//
export const photoGet = (key) => ({
  type: photoType['PHOTO_GET'],
  album: key
})

//
// export const crumbDispatch = (dispatch, crumbSeed) => {
//   dispatch({
//     type: crumbSeed.breadType, 
//     payload: crumbSeed.breadData
//   })
//   dispatch({
//     type: crumbSeed.breadSizeType
//   })   
// }

export const trackCurrDispatch = (dispatch, curr) => {
  dispatch({
    type: trackCurrType['TRACK_CURR_SET'],
    payload: curr
  })
}

export const trackDispatch = (dispatch, history) => {
  const { location } = history
  const _path = location.pathname
  const crumb = crumbDefine[_path]
  let _payload = location
  _payload.level = crumb.level
  _payload.name = crumb.name

  if(history.action == 'PUSH') {
    dispatch({
      type: trackStackType['TRACK_STACK_PUSH'],
      payload: _payload
    })
  } else if(history.action == "POP") {
    if(history.length == 1 && !location.key && location.pathname == '/') {
      _payload.key = 'home'
      dispatch({
        type: trackStackType['TRACK_STACK_PUSH'],
        payload: _payload
      })
    } else {
      dispatch({
        type: trackStackType['TRACK_STACK_POINT'],
        payload: location
      })
    }
  }
}