import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Authority from '@/views/authority/Authority'
import User from '@/views/authority/user/User'
import Role from '@/views/authority/role/Role'
import Menu from '@/views/authority/menu/Menu'
import Resource from '@/views/authority/resource/Resource'

Vue.use(VueRouter)

// 所有权限通用路由
export const constantRoutes = [
  {
    path: '/',
    name: '首页',
    component: Home,
    hidden: true
  },
  {
    path: '/login',
    name: '登录',
    component: Login,
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404'),
    hidden: true
  }
]

const router = new VueRouter({
  constantRoutes
})

export default router

// 异步挂载的路由，根据权限动态加载的路由
export const asyncRoutes = [
  {
    path: '/authority',
    name: '权限列表',
    component: Authority,
    meta: {
      role: [
        'admin',
        'authority'
      ]
    },
    children: [
      {
        path: 'user',
        name: '用户列表',
        component: User,
        meta: {
          role: [
            'admin',
            'authority'
          ]
        }
      },
      {
        path: 'role',
        name: '角色列表',
        component: Role,
        meta: {
          role: [
            'admin',
            'authority'
          ]
        }
      },
      {
        path: 'menu',
        name: '菜单列表',
        component: Menu,
        meta: {
          role: [
            'admin',
            'authority'
          ]
        }
      },
      {
        path: 'resource',
        name: '资源列表',
        component: Resource,
        meta: {
          role: [
            'admin',
            'authority'
          ]
        }
      }
    ]
  },
  // 404 页面路由最后加载，如果放在前面，则会拦截所有路径
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
