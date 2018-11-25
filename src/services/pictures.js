import request from '../utils/request'
import '../utils/constant'

export async function queryCategories() {
	return request(`${constant.service_url}/category`)
}