import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/project/task/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/project/task',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/project/task/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/project/task/' + id,
    method: 'delete'
  })
}

// export function putObj(id, obj) {
//   return fetch({
//     url: '/api/project/project/' + id,
//     method: 'put',
//     data: obj
//   })
// }

export function all() {
  return fetch({
    url: '/api/project/task/all',
    method: 'get'
  })
}

// mock测试数据接口
export function getTaskData(taskId) {
  return fetch({
    url: '/sys/project/task/' + taskId,
    method: 'get'
  })
}
