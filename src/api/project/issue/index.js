import fetch from 'utils/fetch'

// 查找问题
export function pageIssue(query) {
  return fetch({
    url: '/api/project/issue/page',
    method: 'get',
    params: query
  })
}

// 查找全部问题
export function allIssue() {
  return fetch({
    url: '/api/project/issue/all',
    method: 'get'
  })
}

// 查找某个问题
export function getIssue(id) {
  return fetch({
    url: '/api/project/issue/page' + id,
    method: 'get'
  })
}

// 新建问题
export function addIssue(data) {
  return fetch({
    url: '/api/project/issue',
    method: 'post',
    data: data
  })
}

// 修改问题
export function putIssue(data) {
  return fetch({
    url: '/api/project/issue',
    method: 'put',
    data: data
  })
}

// 删除问题
export function delIssue(id) {
  return fetch({
    url: '/api/project/issue/' + id,
    method: 'delete'
  })
}
