import Vue from 'vue'
import Router from 'vue-router'

// 1. 安装插件
Vue.use(Router)

const home = () => import('views/home/home')
const login = () => import('views/login/login')
const welcome = () => import('views/welcome/welcome')
const paper = () => import('views/paper/paper')
const exam = () => import('views/exam/exam')
const grade = () => import('views/grade/grade')
const user = () => import('views/user/user')
const topic = () => import('views/topic/topic')

// 解决错误：Uncaught (in promise) NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}
// 原因，点击后跳转到与当前页面相同的路由
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 2. 实例化对象
const router = new Router({
  routes:[
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: home,
      children: [
        {path:'/',redirect:'welcome'},
        {path:'welcome',component: welcome},
        {path:'paper',component: paper},
        {path:'exam',component: exam},
        {path:'grade',component: grade},
        {path:'user',component: user},
        {path:'topic',component: topic},
      ]
    },
  ],
  mode: 'history'
});

// 3. 导出
export default router
