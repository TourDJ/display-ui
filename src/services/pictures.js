import request from '../utils/request'

export async function getAlbumPictures(album) {
  return request(`/picture/${album}`)
}