import request from '../utils/request'

export async function getUserinfo(id) {
  return request(`/user/${id}`, {
    method: 'GET'
  })
}