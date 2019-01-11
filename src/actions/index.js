import { photoType, trackCurrType, trackStackType, albumCurrType } from './actionTypes'
import crumbs from '../../config/crumbs'

//Retrieve photos by album key
export const photoGet = (key) => ({
  type: photoType['PHOTO_GET'],
  album: key
})

//Get current browse album
export const albumGet = (key) => ({
  type: albumCurrType['ALBUM_CURRENT_GET'],
  key: key
})

//Update album with some properties, such as star, views and so on.
export const albumUpdate = (album) => ({
  type: albumCurrType['ALBUM_CURRENT_UPDATE'],
  album: album
})

//Dispatch current track to set the current location,
//it's for bread crumb
export const trackCurrDispatch = (dispatch, curr) => {
  dispatch({
    type: trackCurrType['TRACK_CURR_SET'],
    payload: curr
  })
}

//Recursive match crumb path
function matchCrumb(_path) {
  let crumb = crumbs[_path]
  if(crumb)
    return crumb

  let _path_ = _path
  let index = _path_.lastIndexOf('/')
  while( index > 0 ) {
    _path_ = _path_.substring(0, index)
    crumb = crumbs[_path_]
    if(crumb && crumb.dynamic)
      return crumb 

    index = _path_.lastIndexOf('/')  
  }
  return null
}

//Dispatch track, reset bread crumb stack by push or pop
export const trackDispatch = (dispatch, history, curr) => {
  const { location } = history
  const _path = location.pathname
  const crumb = matchCrumb(_path)
  let _payload = location
  if(crumb) {
    _payload.level = crumb.level
    _payload.name = crumb.name
    _payload.visit = crumb.visit
  }

  if(history.action == 'PUSH') {
    dispatch({
      type: trackStackType['TRACK_STACK_PUSH'],
      payload: _payload
    })
  } else if(history.action == "POP") {
    //Applicable to situation list below:
    //1. First load of web index page, and have no location key right now;
    //2. Sometimes we can input web url in the address bar directly, and no matter
    //   the which location the url stop
    //All above situations must satisfy to the location action is POP.
    if(location.level == 1 /*&& !location.key*/ && location.pathname == '/' && !curr) {
      _payload.key = 'home'
      dispatch({
        type: trackStackType['TRACK_STACK_PUSH'],
        payload: _payload
      })
    } else {
      if(!location.key && location.pathname == '/')
        location.key = 'home'
      dispatch({
        type: trackStackType['TRACK_STACK_POINT'],
        payload: location
      })
    }
  }
}