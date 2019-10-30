/**
 * 整个app的路由设置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/index',
    component: require('../views/index'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'rage',
        component: require('../views/rage')
      },
      {
        path: 'songList',
        component: require('../views/songList')
      },
      {
        path: 'mvList',
        component: require('../views/mvList')
      },
      {
        path: 'hotSinger',
        component: require('../views/hotSinger')
      }
    ]
  }, {
    name: 'playerDetail',
    path: '/playerDetail/:id',
    meta: {
      title: '搜索'
    },
    component: require('../views/playerDetail')
  }, {
    path: '/playListDetail/:id',
    name: 'playListDetail',
    component: require('../views/playListDetail')
  }, {
    path: '/search',
    name: 'search',
    meta: {
      title: '搜索'
    },
    component: require('../views/search')
  }, {
    path: '/login',
    name: 'login',
    component: require('../views/login')
  }, {
    path: '/searchResult',
    name: 'searchResult',
    component: require('../views/searchResult')
  }, {
    path: '/recommend',
    name: 'recommend',
    component: require('../views/recommend')
  }, {
    path: '/rankList',
    name: 'rankList',
    component: require('../views/rankList')
  }, {
    path: '/mvDetail/:id',
    name: 'mvDetail',
    component: require('../views/mvDetail')
  }, {
    path: '/hotSingerList/:id',
    name: 'hotSingerList',
    component: require('../views/hotSingerList')
  }, {
    path: '/userDj',
    name: 'userDj',
    component: require('../views/userDj')
  }, {
    path: '/djDetail/:id',
    name: 'djDetail',
    component: require('../views/djDetail')
  }, {
    path: '*', redirect: '/index/rage'
  }]
})

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   document.title = to.matched[0].meta.title
//   next()
// })

export default router
