import { takeEvery, call, put } from 'redux-saga/effects'
import { userType } from '../actions/actionTypes'
import { getUserinfo } from  '../services/user'

//Get some album's all photos
function* getUser(action) {
  try {
    let data
    let result = yield call(getUserinfo, action.id)
    if(result.statusCode == 200)
      data = result.data[0]

    yield put({type: userType['USER_GET_SUCCEEDED'], payload: data})
  } catch (e) {
    yield put({type: userType['USER_GET_FAILED'], message: e.message})
  }
}

//Get albums by category
export default function* watchUsers() {
  yield takeEvery(userType['USER_GET'], getUser)
}