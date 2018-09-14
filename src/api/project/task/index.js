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
// export function getTaskData(taskId) {
//   return fetch({
//     url: '/jhn/project/task/' + taskId,
//     method: 'get'
//   })
// }

// 获取我参加的任务列表(不区分项目) crtUser
export function joined(query) {
  return fetch({
    url: '/api/project/task/joined',
    method: 'get',
    params: query
  })
}

// 获取我参加的任务列表(区分项目) crtUser projectId
export function joinedTaskInProject(query) {
  return fetch({
    url: '/api/project/task/project/joined',
    method: 'get',
    params: query
  })
}

// 获取某个任务中的文件列表
export function getFileList(query) {
  return fetch({
    url: '/api/project/task/repository',
    method: 'get',
    params: query
  })
}

export function getTaskBranch(taskId) {
  return fetch({
    url: '/api/project/task/' + taskId + '/branches',
    method: 'get'
  })
}
