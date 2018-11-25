import { stringify } from 'qs'
import request from '../utils/request'
import '../utils/constant'

export async function addAlbum(param) {
  return request(`${constant.service_url}/album/add`, {
    method: 'POST',
    body: param
  })
}