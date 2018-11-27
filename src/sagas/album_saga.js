import { takeEvery, take, call, put } from 'redux-saga/effects'
import { addAlbum, getCategoryAlbums } from '../services/albums'
import { categoryType, albumType } from '../actions/actionTypes'

//Get albums by category
export default function* watchAlbums() {
  yield takeEvery(albumType['ALBUM_GET'], getAlbumsByCategory) 
}

export function* getAlbumsByCategory(action) {
  try {
    let result = yield call(getCategoryAlbums, action.category)
    let data
    if(result.statusCode == 200)
      data = result.data

    yield put({type: albumType['ALBUM_GET_SUCCEEDED'], payload: data})
  } catch (e) {
    yield put({type: albumType['ALBUM_GET_FAILED'], message: e.message})
  }
}

export function* saveAlbum() {
  try {
    const action = yield take(albumType['ALBUM_SAVE'])
    
    let result = yield call(addAlbum, action.album)
    let data
    if(result.statusCode == 200)
      data = result.data

    yield put({type: albumType['ALBUM_SAVE_SUCCEEDED'], payload: data})
  } catch (e) {
    yield put({type: albumType['ALBUM_SAVE_FAILED'], message: e.message})
  }
}