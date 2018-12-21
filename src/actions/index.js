import { photoType, trackCurrType, trackStackType } from './actionTypes'
import crumbDefine from './crumbDefine'

//
export const photoGet = (key) => ({
  type: photoType['PHOTO_GET'],
  album: key
})

export const trackCurrDispatch = (dispatch, curr) => {
  dispatch({
    type: trackCurrType['TRACK_CURR_SET'],
    payload: curr
  })
}

//递归匹配路径
function matchCrumb(_path) {
  let crumb = crumbDefine[_path]
  if(crumb)
    return crumb

  let _path_ = _path
  let index = _path_.lastIndexOf('/')
  while( index > 0 ) {
    _path_ = _path_.substring(0, index)
    crumb = crumbDefine[_path_]
    if(crumb && crumb.dynamic)
      return crumb 

    index = _path_.lastIndexOf('/')  
  }
  return null
}

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
    //首页第一次加载时，action为pop，所以要特殊处理
    if(location.level == 1 && !location.key && location.pathname == '/' && !curr) {
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