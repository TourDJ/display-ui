import { stringify } from 'qs'
import request from '../utils/request'

//Get albums by category key
export async function getCategoryAlbums(category) {
  const result = request(`/album?category=${category}`, {
    method: 'GET'
  })
  return result
}

//Add a album in a category
export async function addAlbum(album) {
  const result = request(`/album/add`, {
    method: 'POST',
    body: {
      album
    }
  })
  return result
}

//Update album
export async function editAlbum(album) {
  const result = request(`/album/edit`, {
    method: 'PUT',
    body: {
      album
    }
  })
  return result
}

//Delte a album
export async function removeAlbum(key) {
  const result = request(`/album/delete`, {
    method: 'POST',
    body: {
      key: key
    }
  })
  return result
}