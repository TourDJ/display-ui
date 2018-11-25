import { all } from 'redux-saga/effects'
import watchCategories from './category_saga'
import { saveAlbum } from './album_saga'

export default function* sagas() {
	yield all([
		watchCategories(),
    saveAlbum()
	])
}