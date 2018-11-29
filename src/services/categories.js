import request from '../utils/request'
import '../utils/constant'

export async function queryCategories() {
  return request(`${constant.service_url}/category`)
}

export async function addCategory(param) {
  let result = request(`${constant.service_url}/category/add`, {
    method: 'POST',
    body: {
      category: param
    }
  })  
  return result
}