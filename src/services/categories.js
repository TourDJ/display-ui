import request from '../utils/request'
import '../utils/constant'

//Query categories service
export async function queryCategories() {
  return request(`${constant.service_url}/category`)
}

//Add a category service
export async function addCategory(param) {
  let result = request(`${constant.service_url}/category/add`, {
    method: 'POST',
    body: {
      category: param
    }
  })  
  return result
}