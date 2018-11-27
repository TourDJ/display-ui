import { all } from 'redux-saga/effects'
import watchCategories from './category_saga'
import watchAlbums, { saveAlbum } from './album_saga'

export default function* sagas() {
	yield all([
		watchCategories(),
    watchAlbums(),
    saveAlbum()
	])
}