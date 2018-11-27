import { stringify } from 'qs'
import request from '../utils/request'
import '../utils/constant'

//Add a album in a category
export async function addAlbum(param) {
  let result = request(`${constant.service_url}/album/add`, {
    method: 'POST',
    body: param
  })
  return result
}

//Get albums by category key
export async function getCategoryAlbums(category) {
  let result = request(`${constant.service_url}/album?category=${category}`)
  return result
}