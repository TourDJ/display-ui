import { all } from 'redux-saga/effects'
import watchCategories from './categorySaga'
import watchAlbums from './albumSaga'
import watchPhotos from './photoSaga'

export default function* sagas() {
	yield all([
		watchCategories(),
    watchAlbums(),
    watchPhotos(),
	])
}