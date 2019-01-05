//Internationalization setting with chinese about the application's title, content,
//message and others. It not include the outer's component's set, which may use its
//own method finished.
import category from './zh-CN/category'
import album from './zh-CN/album'
import photo from './zh-CN/photo'

//This file's setting be composed of a common global setting, plus included every big 
//module's setting
export default {
  'app.forms.basic.description':
    '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
  ...category,
  ...album,
  ...photo,
}