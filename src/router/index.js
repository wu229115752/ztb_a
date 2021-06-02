import Vue from 'vue'
import VueRouter from 'vue-router'


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/ztb',
    component: () => import('../views/home')
  },
  {
    path: '/ztb',
    component: () => import('../views/ztb')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 判断是否拥有电子印章 每个也页面进入前都要优先进行路由拦截


export default router
