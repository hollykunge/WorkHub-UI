import fetch from 'utils/fetch'

// 查看当前任务下的任务成员
export function getTaskMember(query) {
  return fetch({
    url: '/api/project/map/page',
    method: 'get',
    params: query
  })
}

// 关联已选择用户
export function associateUser(id, data) {
  return fetch({
    url: '/api/project/map/' + id,
    method: 'post',
    params: data
  })
}

// 修改成员权限
export function modifyMemberPermission(obj) {
  return fetch({
    url: '/api/project/map',
    method: 'put',
    data: obj
  })
}

// 删除成员
export function deleteMember(userId) {
  return fetch({
    url: '/api/project/map/' + userId,
    method: 'delete'
  })
}
