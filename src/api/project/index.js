import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/project/project/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/project/project',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/project/project/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/project/project/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/project/project/' + id,
    method: 'put',
    data: obj
  })
}

export function all() {
  return fetch({
    url: '/api/project/project/all',
    method: 'get'
  })
}
