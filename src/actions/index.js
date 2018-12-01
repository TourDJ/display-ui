import { pictureType } from './actionTypes'

export const pictureGet = (key) => ({
  type: pictureType['PICTURE_GET'],
  album: key
})