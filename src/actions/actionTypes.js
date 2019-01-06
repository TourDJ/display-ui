//Action type object dictionary, which defined all the ations for dispatch
//At present all module's action type all defined here together

//User action type, which role include retireve user info
export const userType = {
  USER_GET: 'USER_GET',
  USER_GET_SUCCEEDED: 'USER_GET_SUCCEEDED',
  USER_GET_FAILED: 'USER_GET_FAILED'
}

//Category action type, which role include get catefories,
//save category.
export const categoryType = {
  CATEGORY_ALL_GET: 'CATEGORY_ALL_GET',
  CATEGORY_ALL_SUCCEEDED: 'CATEGORY_ALL_SUCCEEDED',
  CATEGORY_ALL_FAILED: 'CATEGORY_ALL_FAILED',
  CATEGORY_SAVE: 'CATEGORY_SAVE',
  CATEGORY_SAVE_SUCCEEDED: 'CATEGORY_SAVE_SUCCEEDED',
  CATEGORY_SAVE_FAILED: 'CATEGORY_SAVE_FAILED'
}

//Album action type, which role include get all albums,
//save or update or delete album.
export const albumType = {
  ALBUM_GET: 'ALBUM_GET',
  ALBUM_GET_SUCCEEDED: 'ALBUM_GET_SUCCEEDED',
  ALBUM_GET_FAILED: 'ALBUM_GET_FAILED',
  ALBUM_SAVE: 'ALBUM_SAVE',
  ALBUM_SAVE_SUCCEEDED: 'ALBUM_SAVE_SUCCEEDED',
  ALBUM_SAVE_FAILED: 'ALBUM_SAVE_FAILED',
  ALBUM_DELETE: 'ALBUM_DELETE',
  ALBUM_DELETE_SUCCEEDED: 'ALBUM_DELETE_SUCCEEDED',
  ALBUM_DELETE_FAILED: 'ALBUM_DELETE_FAILED',
  ALBUM_UPDATE: 'ALBUM_UPDATE',
  ALBUM_UPDATE_SUCCEEDED: 'ALBUM_UPDATE_SUCCEEDED',
  ALBUM_UPDATE_FAILED: 'ALBUM_UPDATE_FAILED'
}

//Current album action type, the result represent current active album.
export const albumCurrType = {
  ALBUM_CURRENT_GET: 'ALBUM_CURRENT_GET',
  ALBUM_CURRENT_GET_SUCCEEDED: 'ALBUM_CURRENT_GET_SUCCEEDED',
  ALBUM_CURRENT_GET_FAILED: 'ALBUM_CURRENT_GET_FAILED',
  ALBUM_CURRENT_UPDATE: 'ALBUM_CURRENT_UPDATE',
  ALBUM_CURRENT_UPDATE_SUCCEEDED: 'ALBUM_CURRENT_UPDATE_SUCCEEDED',
  ALBUM_CURRENT_UPDATE_FAILED: 'ALBUM_CURRENT_UPDATE_FAILED'
}

//Album state action type, which role is recode the current state
//when save or update album, then base the state to jump page, meanwhile
//would re-set the state to init state. First time would load the init state.
export const albumStateType = {
  ALBUM_INITIAL_STATE: 'ALBUM_INITIAL_STATE',
  ALBUM_SUCCEES_STATE: 'ALBUM_SUCCEES_STATE',
  ALBUM_FAILE_STATE: 'ALBUM_FAILE_STATE'  
}

//Photo action type, which role include get photos by album,
//save or update or delete photo, also include view photos by
//album and can doing something about it.
export const photoType = {
  PHOTO_GET: 'PHOTO_GET',
  PHOTO_GET_SUCCEEDED: 'PHOTO_GET_SUCCEEDED',
  PHOTO_GET_FAILED: 'PHOTO_GET_FAILED',
  PHOTO_SAVE: 'PHOTO_SAVE',
  PHOTO_SAVE_SUCCEEDED: 'PHOTO_SAVE_SUCCEEDED',
  PHOTO_SAVE_FAILED: 'PHOTO_SAVE_FAILED',
  PHOTO_DELETE: 'PHOTO_DELETE',
  PHOTO_DELETE_SUCCEEDED: 'PHOTO_DELETE_SUCCEEDED',
  PHOTO_DELETE_FAILED: 'PHOTO_DELETE_FAILED',
  PHOTO_UPDATE: 'PHOTO_UPDATE',
  PHOTO_UPDATE_SUCCEEDED: 'PHOTO_UPDATE_SUCCEEDED',
  PHOTO_UPDATE_FAILED: 'PHOTO_UPDATE_FAILED',  
  PHOTO_VIEW: 'PHOTO_VIEW'
}

//Photo state action type, which role is record the current
//when save or update photo, then base the state to jump page, meanwhile
//would re-set the state to init state. First time would load the init state.
export const photoStateType = {
  PHOTO_INITIAL_STATE: 'PHOTO_INITIAL_STATE',
  PHOTO_SUCCEES_STATE: 'PHOTO_SUCCEES_STATE',
  PHOTO_FAILE_STATE: 'PHOTO_FAILE_STATE'
}

//Photo batch action type, which role is for batch upload photos.
export const photoBatchType = {
  PHOTO_SAVE_BATCH: 'PHOTO_SAVE_BATCH',
  PHOTO_SAVE_BATCH_SUCCEEDED: 'PHOTO_SAVE_BATCH_SUCCEEDED',
  PHOTO_SAVE_BATCH_FAILED: 'PHOTO_SAVE_BATCH_FAILED'
}

//Category tab selected type
export const tabType = {
  TAB_KEY: 'TAB_KEY'
}

//Current track type, record current active locaion key.
export const trackCurrType = {
  TRACK_CURR_SET: 'TRACK_CURR_SET'
}

//Stack track type, which is for operate bread crumb stack,
//and base on it push or pop crumb stack.
export const trackStackType = {
  TRACK_STACK_PUSH: 'TRACK_STACK_PUSH',
  TRACK_STACK_POINT: 'TRACK_STACK_POINT'
}