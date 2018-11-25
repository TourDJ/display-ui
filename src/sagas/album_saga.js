import { take, call, put } from 'redux-saga/effects'
import { addAlbum } from '../services/albums'
import { albumType } from '../actions/actionTypes'

export function* saveAlbum() {
  try {
    const action = yield take(albumType['ALBUM_SAVE'])
    let flag = yield call(addAlbum, action.album)
    yield put({type: albumType['ALBUM_SAVE_SUCCEEDED'], payload: flag})
  } catch (e) {
    yield put({type: albumType['ALBUM_SAVE_FAILED'], message: e.message})
  }
}