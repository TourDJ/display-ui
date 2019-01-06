//Internationalization setting with chinese about the application's title, content,
//message and others. It not include the outer's component's set, which may use its
//own method finished.
import category from './zh-CN/category'
import album from './zh-CN/album'
import photo from './zh-CN/photo'

//This file's setting be composed of a common global setting, plus included every big 
//module's setting
export default {
  'app.basic.caption': '游&nbsp;&nbsp;記',
  'app.basic.banner': '解放心情，踏足远行',
  'app.basic.return': '返回',
  'app.top.right.personal': '个人中心',
  'app.top.right.logout': '退出登录',
  ...category,
  ...album,
  ...photo,
}