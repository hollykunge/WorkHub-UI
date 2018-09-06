import fetch from 'utils/fetch'

// 查找合并请求
export function pagePull(query) {
  return fetch({
    url: '/api/project/task/pull/page',
    method: 'get',
    params: query
  })
}

// 查找全部合并请求
export function allPull() {
  return fetch({
    url: '/api/project/task/pull/all',
    method: 'get'
  })
}

// 查找某个合并请求
export function getPull(id) {
  return fetch({
    url: '/api/project/task/pull/page' + id,
    method: 'get'
  })
}

// 新建合并请求
export function addPull(data) {
  return fetch({
    url: '/api/project/task/pull',
    method: 'post',
    data: data
  })
}

// 修改合并请求
export function putPull(data) {
  return fetch({
    url: '/api/project/task/pull',
    method: 'put',
    data: data
  })
}

// 删除合并请求
export function delPull(id) {
  return fetch({
    url: '/api/project/task/pull/' + id,
    method: 'delete'
  })
}
