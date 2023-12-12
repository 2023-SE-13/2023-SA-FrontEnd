import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import MainPage from '@/views/MainPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '首页',
    redirect:'/main'
  },
  {
    path:'/home',
    name:'主页',
    component:()=>import('@/views/HomeView'),
    children:[
      {
        path:'/about',
        name:'关于我们',
        component:()=>import('@/views/AboutUs')
      },
      {
        path:'/introduce',
        name:'资源介绍',
        component:()=>import('@/views/Introduce')
      },
      {
        path:'/temp1',
        name:'暂定1',
        component:()=>import('@/views/Temp')
      },
      // {
      //   path:'/main',
      //   name:'首页1',
      //   component:()=>import('@/views/Main')
      // }
      {
        path:'/main',
        name:'首页1',
        component:()=>import('@/views/HomePage')
      },
      {
        path:'/login',
        name:'登录',
        component:()=>import('@/views/LoginPage')
      },
      {
        path:'/settings',
        name:'设置',
        component:()=>import('@/views/Setting')
      },
      {
        path:'/authentication',
        name:'账号认证',
        component:()=>import('@/views/Authentication.vue')
      },
      {
        path:'/explore',
        name:'检索结果',
        component:()=>import('@/views/Explore.vue')
      }
    ]
  },
  {
    path:'/personHomepage',
    name:'个人主页',
    component:()=>import('@/views/PersonHomepage')
  },
  // 文献详情模块
  {
    path:'/article',
    name:'个人主页',
    component:()=>import('@/views/Article')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
