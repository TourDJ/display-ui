import { call, put, take, all } from 'redux-saga/effects'
import { queryCategories } from '../services/pictures'

function* retrievalCategories() {
   try {
//    		const request = yield take({take: 'CATEGORY_ALL_GET'})
// console.log(request)
      const categories = yield call(queryCategories);

      yield put({type: 'CATEGORY_ALL_SUCCEEDED', payload: categories});
      
   } catch (e) {
      yield put({type: 'CATEGORY_ALL_FAILED', message: e.message});
   }
}

export default function* sagas() {
	yield all([
		retrievalCategories()
	])
}