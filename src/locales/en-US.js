//Internationalization setting with english about the application's title, content,
//message and others. It not include the outer's component's set, which may use its
//own method finished.
import category from './en-US/category'
import album from './en-US/album'
import photo from './en-US/photo'

//This file's setting be composed of a common global setting, plus included every big 
//module's setting
export default {
  'app.basic.caption': 'Travelogue',
  'app.basic.banner': 'Emancipate the mood, Step on the road',
  'app.basic.return': 'Back',
  'app.top.right.personal': 'Personal center',
  'app.top.right.logout': 'Logout',
  'app.crumb.index': 'Index',
  'app.crumb.album.add': 'Add album',
  'app.crumb.album.edit': 'Edit album',
  'app.crumb.photo.view': 'View photo',
  'app.crumb.photo.manage': 'Manage photo',
  'app.crumb.photo.add': 'Add photo',
  'app.crumb.photo.add.batch': 'Batch add photo',
  'app.crumb.photo.edit': 'Edit photo',  
  ...category,
  ...album,
  ...photo,
}