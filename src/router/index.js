import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue')
    // children: [
    //   { // 政策法规
    //     path: '',
    //     name: 'NewFiles',
    //     component: () => import('../components/newFiles/index.vue')
    //   },
    // ]
  },
  { // 政策法规
    path: '/newFiles',
    name: 'NewFiles',
    component: () => import('../components/newFiles/index.vue')
  },
  { // 搜索引擎
    path: '/searchEngine',
    name: 'SearchEngine',
    component: () => import('../components/searchEngine/index.vue')
  },
  { // 智慧云端
    path: '/smartcloud',
    name: 'Smartcloud',
    component: () => import('../components/smartcloud/index.vue')
  },
  { // 网上商城
    path: '/onlineMall',
    name: 'OnlineMall',
    component: () => import('../components/onlineMall/index.vue')
  },
  { // 操作手册
    path: '/usermanual',
    name: 'Usermanual',
    component: () => import('../components/usermanual/index.vue')
  },
  { // 演示视频
    path: '/videoList',
    name: 'VideoList',
    component: () => import('../components/video/index.vue')
  },
  { // 视频播放页面
    path: '/playVideo',
    name: 'PlayVideo',
    component: () => import('../components/video/playVideo.vue')
  },
  { // 文件详情页面
    path: '/fileSharing',
    name: 'FileSharing',
    component: () => import('../components/common/fileSharing/index.vue')
  },
  { // 重定向到index页面
    path: '*',
    redirect: "/"
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
