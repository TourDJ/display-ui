import { photoType } from './actionTypes'

export const photoGet = (key) => ({
  type: photoType['PHOTO_GET'],
  album: key
})