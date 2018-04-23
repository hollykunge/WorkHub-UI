import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/project/team/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/project/team',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/project/team/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/project/team/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/project/team/' + id,
    method: 'put',
    data: obj
  })
}

export function all() {
  return fetch({
    url: '/api/project/team/all',
    method: 'get'
  })
}

export function modifyTeamUsers(teamId, data) {
  return fetch({
    url: '/api/project/team/' + teamId + '/team',
    method: 'put',
    params: data
  })
}
