import { takeEvery, take, call, put } from 'redux-saga/effects'
import { addAlbum, getCategoryAlbums, removeAlbum, 
  editAlbum, getAlbum } from '../services/albums'
import { categoryType, albumType, albumStateType, 
  albumCurrType } from '../actions/actionTypes'

//When the ALBUM_GET action trigger, then invoke it
function* getAlbumsByCategory(action) {
  let data
  try {
    let result = yield call(getCategoryAlbums, action.category)
    if(result.statusCode == 200)
      data = result.data

    yield put({type: albumType['ALBUM_GET_SUCCEEDED'], payload: data})
  } catch (e) {
    yield put({type: albumType['ALBUM_GET_FAILED'], message: e.message})
  }
}

//Save ablum effect for save album data to db
function* saveAlbum(action) {
  let data
  try {
    let result = yield call(addAlbum, action.album)
    if(result.statusCode == 200)
      data = result.data

    yield put({type: albumType['ALBUM_SAVE_SUCCEEDED'], payload: data})
    yield put({type: albumStateType['ALBUM_SUCCEES_STATE']})
  } catch (e) {
    yield put({type: albumType['ALBUM_SAVE_FAILED'], message: e.message})
    yield put({type: albumStateType['ALBUM_FAILE_STATE']})
  }
}

//Update album
function* updateAlbum(action) {
  let data
  try {
    let result = yield call(editAlbum, action.album)
    if(result.statusCode == 200)
      data = result.data

    yield put({type: albumType['ALBUM_UPDATE_SUCCEEDED'], payload: data})
    yield put({type: albumStateType['ALBUM_SUCCEES_STATE']})
  } catch (e) {
    yield put({type: albumType['ALBUM_UPDATE_FAILED'], message: e.message})
    yield put({type: albumStateType['ALBUM_FAILE_STATE']})
  }  
}

//Delete a ablum, just logic delete
function* deleteAlbum(action) {
  let data
  try {
    let result = yield call(removeAlbum, action.key)

    result = JSON.parse(result)
    if(result.statusCode == 200)
      data = result.data

    yield put({type: albumType['ALBUM_DELETE_SUCCEEDED'], payload: data})
  } catch (e) {
    yield put({type: albumType['ALBUM_DELETE_FAILED'], message: e.message})
  }  
}

function* getAlbumByKey(action) {
  let data
  try {
    let result = yield call(getAlbum, action.key)
    if(result.statusCode == 200)
      data = result.data[0]

    yield put({type: albumCurrType['ALBUM_CURRENT_GET_SUCCEEDED'], payload: data})
  } catch (e) {
    yield put({type: albumCurrType['ALBUM_CURRENT_GET_FAILED'], message: e.message})
  }
}

function* updateAlbumSingle(action) {
  let data
  try {
    let result = yield call(editAlbum, action.album)
    if(result.statusCode == 200)
      data = result.data

    yield put({type: albumCurrType['ALBUM_CURRENT_UPDATE_SUCCEEDED'], payload: data})
  } catch (e) {
    yield put({type: albumCurrType['ALBUM_CURRENT_UPDATE_FAILED'], message: e.message})
  }    
}

//Get albums by category
export default function* watchAlbums() {
  yield takeEvery(albumType['ALBUM_GET'], getAlbumsByCategory) 
  yield takeEvery(albumType['ALBUM_SAVE'], saveAlbum)
  yield takeEvery(albumType['ALBUM_UPDATE'], updateAlbum)
  yield takeEvery(albumType['ALBUM_DELETE'], deleteAlbum)
  yield takeEvery(albumCurrType['ALBUM_CURRENT_GET'], getAlbumByKey)
  yield takeEvery(albumCurrType['ALBUM_CURRENT_UPDATE'], updateAlbumSingle)
}
