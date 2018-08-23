import fetch from 'utils/fetch'

// 查找问题
export function getIssue(query) {
  return fetch({
    url: '/api/project/task/issue',
    method: 'get',
    params: query
  })
}

// 新建问题
export function addIssue(data) {
  return fetch({
    url: '/api/project/task/issue',
    method: 'post',
    data: data
  })
}

// 修改问题
export function putIssue(data) {
  return fetch({
    url: '/api/project/task/issue',
    method: 'put',
    data: data
  })
}

// 删除问题
export function delIssue(id) {
  return fetch({
    url: '/api/project/task/issue' + id,
    method: 'delete'
  })
}
