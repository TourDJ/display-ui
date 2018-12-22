import request from '../utils/request'

export async function getAlbumPhotos(album) {
  return request(`/album/photo/${album}`, {
    method: 'GET'
  })
}

export async function savePhoto(photo, album) {
  const result = request(`/photo/save`, {
    method: 'POST',
    body: {
      photo,
      album
    }
  })
  return result
}

export async function updatePhoto(photo) {
  const result = request(`/photo/update`, {
    method: 'PUT',
    body: {
      photo
    }
  })
  return result
}

export async function deletePhoto(key) {
  const result = request(`/photo/delete`, {
    method: 'DELETE',
    body: {
      key
    }
  })
  return result
}

export async function savePhotos(photos) {
  const result = request(`/photo/add/batch`, {
    method: 'POST',
    body: {
      photos
    }
  })
  return result
}