/**
 * 基础路由
 * @type { *[] }
 */

export const constantRouterMap = [

  {
    path: '',
    redirect: '/LoginActivity',
    meta: {
      title: '品牌保护法',
      keepAlive: false
    }
  },
  {
    path: '/LoginActivity',
    component: () => import('@/views/LoginActivity'),
    meta: {
      title: '品牌商登录',
      keepAlive: false
    }
  },

  {
    path: '/HomeActivity',
    name: 'HomeActivity',
    component: () => import('@/views/HomeActivity'),
    meta: {
      title: '首页',
      keepAlive: false
    }
  },
  {
    path: '/MapActivity',
    name: 'MapActivity',
    component: () => import('@/views/MapActivity'),
    meta: {
      title: '地图',
      keepAlive: false
    }
  },
  {
    path: '/SignActivity',
    name: 'SignActivity',
    component: () => import('@/views/SignActivity'),
    mate: {
      title: '签名',
      keepAlive: false
    }
  }
]
