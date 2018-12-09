import { takeEvery, take, call, put } from 'redux-saga/effects'
import { addAlbum, getCategoryAlbums, minusAlbum } from '../services/albums'
import { categoryType, albumType } from '../actions/actionTypes'

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
    let result = yield call(addAlbum, action.album, action.tabKey)
    if(result.statusCode == 200)
      data = result.data

    yield put({type: albumType['ALBUM_SAVE_SUCCEEDED'], payload: data})
    yield put({type: albumType['ALBUM_SUCCEES_STATE']})
  } catch (e) {
    yield put({type: albumType['ALBUM_SAVE_FAILED'], message: e.message})
    yield put({type: albumType['ALBUM_FAILE_STATE']})
  }
}

//Delete a ablum, just logic delete
function* deleteAlbum(action) {
  let data
  try {
    let result = yield call(minusAlbum, action.key)
    if(result.statusCode == 200)
      data = result.data

    yield put({type: albumType['ALBUM_DELETE_SUCCEEDED'], payload: data})
  } catch (e) {
    yield put({type: albumType['ALBUM_DELETE_FAILED'], message: e.message})
  }  
}

//Get albums by category
export default function* watchAlbums() {
  yield takeEvery(albumType['ALBUM_GET'], getAlbumsByCategory) 
  yield takeEvery(albumType['ALBUM_SAVE'], saveAlbum)
  yield takeEvery(albumType['ALBUM_DELETE'], deleteAlbum)
}
