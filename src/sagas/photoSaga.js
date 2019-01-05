import { takeEvery, take, call, put } from 'redux-saga/effects'
import { photoType, photoBatchType } from '../actions/actionTypes'
import { getAlbumPhotos, savePhoto, deletePhoto, 
  updatePhoto, savePhotos
} from  '../services/photos'

//Get some album's all photos
function* getPhotoByAlbum(action) {
  try {
    let data
    let result = yield call(getAlbumPhotos, action.album)
    if(result.statusCode == 200)
      data = result.data

    yield put({type: photoType['PHOTO_GET_SUCCEEDED'], payload: data})
  } catch (e) {
    yield put({type: photoType['PHOTO_GET_FAILED'], message: e.message})
  }
}

//Save photo, also save belong to album
function* savePhotoWithAlbum(action) {
  try {
    let data
    let result = yield call(savePhoto, action.photo, action.album)
    if(result.statusCode == 200)
      data = result.data

    yield put({type: photoType['PHOTO_SAVE_SUCCEEDED'], payload: data})
    yield put({type: photoStateType['PHOTO_SUCCEES_STATE']})
  } catch (e) {
    yield put({type: photoType['PHOTO_SAVE_FAILED'], message: e.message})
    yield put({type: photoStateType['PHOTO_FAILE_STATE']})
  }
}

//Update photo by key
function* updatePhotoByKey(action) {
  try {
    let data
    let result = yield call(updatePhoto, action.photo)

    if(result.statusCode == 200)
      data = result.data

    yield put({type: photoType['PHOTO_UPDATE_SUCCEEDED'], payload: data})
    yield put({type: photoStateType['PHOTO_SUCCEES_STATE']})
  } catch (e) {
    yield put({type: photoType['PHOTO_UPDATE_FAILED'], message: e.message})
    yield put({type: photoStateType['PHOTO_FAILE_STATE']})
  }
}

//Delete photo by key
function* deletePhotoByKey(action) {
  try {
    let data
    let result = yield call(deletePhoto, action.key)

    result = JSON.parse(result)
    if(result.statusCode == 200)
      data = result.data

    yield put({type: photoType['PHOTO_DELETE_SUCCEEDED'], payload: data})
  } catch (e) {
    yield put({type: photoType['PHOTO_DELETE_FAILED'], message: e.message})
  }
}

function* saveBatchPhoto(action) {
  try {
    let data
    let result = yield call(savePhotos, action.photos)
    if(result.statusCode == 200)
      data = result.data

    yield put({type: photoBatchType['PHOTO_SAVE_BATCH_SUCCEEDED'], payload: data})
    yield put({type: photoStateType['PHOTO_SUCCEES_STATE']})
  } catch (e) {
    yield put({type: photoBatchType['PHOTO_SAVE_BATCH_FAILED'], message: e.message})
    yield put({type: photoStateType['PHOTO_FAILE_STATE']})
  }  
}

//Get albums by category
export default function* watchPhotos() {
  yield takeEvery(photoType['PHOTO_GET'], getPhotoByAlbum) 
  yield takeEvery(photoType['PHOTO_SAVE'], savePhotoWithAlbum)
  yield takeEvery(photoType['PHOTO_UPDATE'], updatePhotoByKey)
  yield takeEvery(photoType['PHOTO_DELETE'], deletePhotoByKey)
  yield takeEvery(photoBatchType['PHOTO_SAVE_BATCH'], saveBatchPhoto)
}