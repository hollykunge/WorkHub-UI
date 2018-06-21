import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  hidden: true
},
{
  path: '/authredirect',
  component: _import('login/authredirect'),
  hidden: true
},
{
  path: '/404',
  component: _import('error/404'),
  hidden: true
},
{
  path: '/401',
  component: _import('error/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: '首页',
  hidden: true,
  children: [{
    path: 'dashboard',
    component: _import('dashboard/index')
  }, {
    path: 'userHome',
    component: _import('zone/index'),
    name: '个人中心'
  }, {
    path: 'helper',
    component: _import('zone/helper'),
    name: '帮助中心'
  }, {
    path: 'notification',
    component: _import('zone/notification'),
    name: '消息中心'
  }, {
    path: 'projectSys/allProjects/:projectId',
    component: _import('project/project/details/index'),
    name: '项目详情',
    redirect: 'projectSys/allProjects/:projectId/projectData',
    props: true,
    children: [{
      path: 'projectData',
      component: _import('project/project/details/data/index'),
      name: '项目数据',
      props: true
    }, {
      path: 'projectIntro',
      component: _import('project/project/details/intro/index'),
      name: '项目详细信息',
      props: true
    }, {
      path: 'ProjectIssue',
      component: _import('project/project/details/issue/index'),
      name: '项目问题',
      props: true
    }, {
      path: 'projectTeam',
      component: _import('project/project/details/team/index'),
      name: '项目团队',
      props: true
    }, {
      path: 'projectSetting',
      component: _import('project/project/details/setting/index'),
      name: '项目设置',
      props: true
    }, {
      path: ':issueId/conversation',
      component: _import('project/project/details/issue/conversation'),
      name: '项目问题详情',
      props: true
    }]
  }, {
    path: 'projectSys/allProjects/:projectId/:taskId',
    component: _import('project/task/index'),
    name: '任务详情',
    redirect: 'projectSys/allProjects/:projectId/:taskId/taskData',
    props: true,
    children: [{
      path: 'taskData',
      component: _import('project/task/components/taskData/index'),
      name: '数据',
      props: true
    }, {
      path: 'pullRequest',
      component: _import('project/task/components/pulls/index'),
      name: '合并请求'
    }, {
      path: 'chartManage',
      component: _import('project/task/components/chartManage/index'),
      name: '图表管理'
    }, {
      path: 'taskIntro',
      component: _import('project/task/components/taskIntro/index'),
      name: '任务简介'
    }, {
      path: 'versionHistory',
      component: _import('project/task/components/versionHistory/index'),
      name: '历史版本'
    }, {
      path: 'memberList',
      component: _import('project/task/components/memberList/index'),
      name: '成员'
    }, {
      path: 'taskSetting',
      component: _import('project/task/components/taskSetting/index'),
      name: '设置'
    }, {
      path: 'new',
      component: _import('project/task/components/taskData/createFile'),
      name: '新建文件'
    }, {
      path: 'upload',
      component: _import('project/task/components/taskData/uploadFile'),
      name: '文件上传'
    }, {
      path: ':pullId',
      component: _import('project/task/components/pulls/content'),
      name: '合并请求详情',
      redirect: ':pullId/conversation',
      props: true,
      children: [{
        path: 'conversation',
        component: _import('project/task/components/pulls/conversation'),
        name: '问题讨论',
        props: true
      }, {
        path: 'commit',
        component: _import('project/task/components/pulls/commit'),
        name: '提交记录',
        props: true
      }, {
        path: 'checks',
        component: _import('project/task/components/pulls/checks'),
        name: '冲突检测',
        props: true
      }, {
        path: 'filesChanged',
        component: _import('project/task/components/pulls/filesChanged'),
        name: '文件变更',
        props: true
      }]
    }, {
      path: 'newPull',
      component: _import('project/task/components/pulls/newPull'),
      name: '新建合并请求',
      props: true
    }]
  }]
},
{
  path: '/introduction',
  component: Layout,
  redirect: '/introduction/index',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: 'index',
    component: _import('introduction/index'),
    name: '简述'
  }]
},
{
  path: '/'
}
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{
  path: '/baseManager',
  component: Layout,
  name: '基础配置管理',
  icon: 'setting',
  authority: 'baseManager',
  children: [{
    path: 'userManager',
    icon: 'fa-user',
    component: _import('admin/user/index'),
    name: '用户管理',
    authority: 'userManager'
  }, {
    path: 'menuManager',
    icon: 'category',
    component: _import('admin/menu/index'),
    name: '菜单管理',
    authority: 'menuManager'
  }, {
    path: 'groupManager',
    icon: 'group_fill',
    component: _import('admin/group/index'),
    name: '角色权限管理',
    authority: 'groupManager'
  }, {
    path: 'groupTypeManager',
    icon: 'fa-users',
    component: _import('admin/groupType/index'),
    name: '角色类型管理',
    authority: 'groupTypeManager'
  }, {
    path: 'orgManager',
    icon: 'group_fill',
    component: _import('admin/organize/index'),
    name: '组织部门管理',
    authority: 'orgManager'
  }, {
    path: 'gateLogManager',
    icon: 'viewlist',
    component: _import('admin/gateLog/index'),
    name: '操作日志管理',
    authority: 'gateLogManager'
  }]
},
{
  path: '/authManager',
  component: Layout,
  name: '服务权限管理',
  icon: 'setting',
  authority: 'authManager',
  children: [{
    path: 'serviceManager',
    component: _import('auth/service/index'),
    name: '用户管理',
    authority: 'serviceManager'
  }]
},
{
  path: '/monitorManager',
  component: Layout,
  name: '监控模块管理',
  icon: 'setting',
  authority: 'monitorManager',
  children: [{
    path: 'serviceEurekaManager',
    component: _import('monitor/eureka/index'),
    name: 'Eureka注册中心',
    authority: 'serviceEurekaManager'
  }, {
    path: 'serviceMonitorManager',
    component: _import('monitor/service/index'),
    name: '服务状态监控',
    authority: 'serviceMonitorManager'
  }, {
    path: 'serviceZipkinManager',
    component: _import('monitor/zipkin/index'),
    name: '服务状态监控',
    authority: 'serviceZipkinManager'
  }]
},
{
  path: '/projectSys',
  component: Layout,
  name: '项目管理',
  icon: 'category',
  authority: 'projectSys',
  children: [{
    path: 'allProjects',
    component: _import('project/project/index'),
    name: '全部项目',
    authority: 'allProjects'
  }, {
    path: 'allTasks',
    component: _import('project/project/index'),
    name: '全部任务',
    authority: 'allTasks'
  }]
},
{
  path: '/teamManager',
  component: Layout,
  name: '团队管理',
  icon: 'group_fill',
  authority: 'teamManager',
  children: [{
    path: 'myTeams',
    component: _import('team/myTeams'),
    name: '创建的团队',
    authority: 'myTeams'
  }, {
    path: 'joinedTeams',
    component: _import('team/joinedTeams'),
    name: '参与的团队',
    authority: 'joinedTeams'
  }]
}
]
