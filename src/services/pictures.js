import { stringify } from 'qs'
import request from '../utils/request'
import '../utils/constant'

export async function queryCategories(params) {
	return request(`${constant.service_url}/category`)
}