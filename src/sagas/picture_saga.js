import { takeEvery, take, call, put } from 'redux-saga/effects'
import { pictureType } from '../actions/actionTypes'
import { getAlbumPictures } from  '../services/pictures'

function* getPicturesByAlbum(action) {
  let data
  try {
    let result = yield call(getAlbumPictures, action.album)
    if(result.statusCode == 200)
      data = result.data

    yield put({type: pictureType['PICTURE_GET_SUCCEEDED'], payload: data})
  } catch (e) {
    yield put({type: pictureType['PICTURE_GET_FAILED'], message: e.message})
  }
}

//Get albums by category
export default function* watchPictures() {
  yield takeEvery(pictureType['PICTURE_GET'], getPicturesByAlbum) 
}