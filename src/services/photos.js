import request from '../utils/request'

export async function getAlbumPhotos(album) {
  return request(`/photo/${album}`, {
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