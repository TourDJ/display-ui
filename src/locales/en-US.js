//Internationalization setting with english about the application's title, content,
//message and others. It not include the outer's component's set, which may use its
//own method finished.
import category from './en-US/category'
import album from './en-US/album'
import photo from './en-US/photo'

//This file's setting be composed of a common global setting, plus included every big 
//module's setting
export default {
'app.forms.basic.description':
    'Form pages are used to collect or verify information to users.',
  ...category,
  ...album,
  ...photo,
}