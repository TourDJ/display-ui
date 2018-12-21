import { all } from 'redux-saga/effects'
import watchCategories from './categorySaga'
import watchAlbums from './albumSaga'
import watchPhotos from './photoSaga'
import watchUsers from './userSaga'

export default function* sagas() {
	yield all([
    watchUsers(),
		watchCategories(),
    watchAlbums(),
    watchPhotos(),
	])
}