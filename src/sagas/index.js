import { all } from 'redux-saga/effects'
import watchCategories from './category_saga'

export default function* sagas() {
	yield all([
		watchCategories()
	])
}