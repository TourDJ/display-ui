import request from '../util/request';

export function queryList() {
  return request('/display/pictures');
}

export function deleteOne(id) {
  return request(`/display/pictures/${id}`, {
    method: 'DELETE'
  });
}

export function addOne(data) {
  return request('/display/pictures/add', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getStatistic(id) {
  return request(`/display/pictures/${id}/statistic`);
}
