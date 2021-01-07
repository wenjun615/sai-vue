import router from '@/router'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 隐藏进度环
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next()
    } else {
      const hasRoles = store.state.roles && store.state.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 因为getInfo中是异步方法，await表示等待这个异步方法的结果
          await store.dispatch('getInfo')
          next()
          /*
            1、设置不能通过浏览器后退历史记录
            2、addRoutes未完成时会找不到路由，这时会再次执行beforeEach，无限循环直到找到路由，这里可以确保addRoutes执行完成。
            但需要注意进入死循环！！！需要有结束循环出口。
           */
          // next({ ...to, replace: true });
        } catch (error) {
          await store.dispatch('resetToken')
          Message.error(error || '发生错误')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
