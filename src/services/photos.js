import request from '../utils/request'
const fetch = require('node-fetch');

export async function getAlbumPhotos(album) {
  return request(`/album/photo/${album}`, {
    method: 'GET'
  })
}

export async function savePhoto(photo, album) {
  let result = request(`/photo/save`, {
    method: 'POST',
    body: {
      photo,
      album
    }
  })
  return result
}

export async function updatePhoto(photo) {
  let result = request(`/photo/update`, {
    method: 'PUT',
    body: {
      photo
    }
  })
  return result
}

export async function deletePhoto(key) {
  let result = request(`/photo/delete`, {
    method: 'DELETE',
    body: {
      key
    }
  })
  return result
}