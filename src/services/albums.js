import { stringify } from 'qs'
import request from '../utils/request'

//Add a album in a category
export async function addAlbum(param, activeTab) {
  let result = request(`/album/add`, {
    method: 'POST',
    body: {
      album: param,
      key: activeTab
    }
  })
  return result
}

//Get albums by category key
export async function getCategoryAlbums(category) {
  let result = request(`/album?category=${category}`)
  return result
}

//Delte a album
export async function minusAlbum(key) {
  let result = request(`/album/delete`, {
    method: 'POST',
    body: {
      key: key
    }
  })
  return result
}