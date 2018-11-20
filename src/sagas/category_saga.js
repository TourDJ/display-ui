import { call, put, takeEvery } from 'redux-saga/effects'
import { queryCategories } from '../services/pictures'

function* retrievalCategories() {
   try {
      const categories = yield call(queryCategories)
      yield put({type: 'CATEGORY_ALL_SUCCEEDED', payload: categories})
   } catch (e) {
      yield put({type: 'CATEGORY_ALL_FAILED', message: e.message})
   }
}

export default function* watchCategories() {
  yield takeEvery('CATEGORY_ALL_GET', retrievalCategories) 
}