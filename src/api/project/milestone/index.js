import fetch from 'utils/fetch'

// 查找里程碑
export function pageMilestone(query) {
  return fetch({
    url: '/api/project/milestone/page',
    method: 'get',
    params: query
  })
}

// 查找全部里程碑
export function allMilestone() {
  return fetch({
    url: '/api/project/milestone/all',
    method: 'get'
  })
}

// 查找某个里程碑
export function getMilestone(id) {
  return fetch({
    url: '/api/project/milestone/page' + id,
    method: 'get'
  })
}

// 新建里程碑
export function addMilestone(data) {
  return fetch({
    url: '/api/project/milestone',
    method: 'post',
    data: data
  })
}

// 修改里程碑
export function putMilestone(data) {
  return fetch({
    url: '/api/project/milestone',
    method: 'put',
    data: data
  })
}

// 删除里程碑
export function delMilestone(id) {
  return fetch({
    url: '/api/project/milestone/' + id,
    method: 'delete'
  })
}
