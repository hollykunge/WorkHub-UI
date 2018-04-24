import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/admin/org/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/org',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/org/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/org/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/org/' + id,
    method: 'put',
    data: obj
  })
}

export function all() {
  return fetch({
    url: '/api/admin/org/all',
    method: 'get'
  })
}
export function getUsers(id) {
  return fetch({
    url: '/api/admin/org/' + id + '/user',
    method: 'get'
  })
}

export function modifyUsers(id, data) {
  return fetch({
    url: '/api/admin/org/' + id + '/user',
    method: 'put',
    params: data
  })
}
