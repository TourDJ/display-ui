import request from '../utils/request'

//Query categories service
export async function queryCategories() {
  return request(`/category`)
}

//Add a category service
export async function addCategory(param) {
  let result = request(`/category/add`, {
    method: 'POST',
    body: {
      category: param
    }
  })  
  return result
}