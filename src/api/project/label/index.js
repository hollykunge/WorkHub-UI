import fetch from 'utils/fetch'

// 查找标签
export function pageLabel(query) {
  return fetch({
    url: '/api/project/label/page',
    method: 'get',
    params: query
  })
}

// 查找全部标签
export function allLabel() {
  return fetch({
    url: '/api/project/label/all',
    method: 'get'
  })
}

// 查找某个标签
export function getLabel(id) {
  return fetch({
    url: '/api/project/label/page' + id,
    method: 'get'
  })
}

// 新建标签
export function addLabel(data) {
  return fetch({
    url: '/api/project/label',
    method: 'post',
    data: data
  })
}

// 修改标签
export function putLabel(data) {
  return fetch({
    url: '/api/project/label',
    method: 'put',
    data: data
  })
}

// 删除标签
export function delLabel(id) {
  return fetch({
    url: '/api/project/label/' + id,
    method: 'delete'
  })
}
