import { takeEvery, take, call, put } from 'redux-saga/effects'
import { photoType } from '../actions/actionTypes'
import { getAlbumPhotos, savePhoto } from  '../services/photos'

function* getPhotoByAlbum(action) {
  let data
  try {
    let result = yield call(getAlbumPhotos, action.album)
    if(result.statusCode == 200)
      data = result.data

    yield put({type: photoType['PHOTO_GET_SUCCEEDED'], payload: data})
  } catch (e) {
    yield put({type: photoType['PHOTO_GET_FAILED'], message: e.message})
  }
}

function* savePhotoWithAlbum(action) {
  let data
  try {
    let result = yield call(savePhoto, action.photo, action.album)
    if(result.statusCode == 200)
      data = result.data

    yield put({type: photoType['PHOTO_SAVE_SUCCEEDED'], payload: data})
    yield put({type: photoType['PHOTO_SUCCEES_STATE']})
  } catch (e) {
    yield put({type: photoType['PHOTO_SAVE_FAILED'], message: e.message})
    yield put({type: photoType['PHOTO_FAILE_STATE']})
  }
}

//Get albums by category
export default function* watchPhotos() {
  yield takeEvery(photoType['PHOTO_GET'], getPhotoByAlbum) 
  yield takeEvery(photoType['PHOTO_SAVE'], savePhotoWithAlbum)
}