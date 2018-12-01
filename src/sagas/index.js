import { all } from 'redux-saga/effects'
import watchCategories from './category_saga'
import watchAlbums from './album_saga'
import watchPictures from './picture_saga'

export default function* sagas() {
	yield all([
		watchCategories(),
    watchAlbums(),
    watchPictures(),
	])
}