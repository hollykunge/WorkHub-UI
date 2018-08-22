import fetch from 'utils/fetch'

// 获取动态列表
export function getActivity(query) {
  return fetch({
    url: '/api/project/act',
    methods: 'get',
    params: query
  })
}
