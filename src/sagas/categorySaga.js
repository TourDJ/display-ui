import { call, put, takeEvery } from 'redux-saga/effects'
import { queryCategories, addCategory } from '../services/categories'
import { categoryType } from '../actions/actionTypes'

function* retrievalCategories() {
   try {
      const categories = yield call(queryCategories)
      yield put({type: categoryType['CATEGORY_ALL_SUCCEEDED'], payload: categories})
   } catch (e) {
      yield put({type: categoryType['CATEGORY_ALL_FAILED'], message: e.message})
   }
}

//Save category effect
function* saveCategory(action) {
  try {
    let result = yield call(addCategory, action.category)
    let data
    if(result.statusCode == 200)
      data = result.data

    yield put({type: categoryType['CATEGORY_SAVE_SUCCEEDED'], payload: data})
  } catch (e) {
    yield put({type: categoryType['CATEGORY_SAVE_FAILED'], message: e.message})
  }
}

export default function* watchCategories() {
  yield takeEvery(categoryType['CATEGORY_ALL_GET'], retrievalCategories) 
  yield takeEvery(categoryType['CATEGORY_SAVE'], saveCategory)
}