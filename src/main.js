import Vue from 'vue'
import App from './App'
import Axios from './utils/diyaxios'
import router from './router/router'
import store from './store'
import MuseUI from 'muse-ui'
import Toast from 'vue-easy-toast'
import 'muse-ui/dist/muse-ui.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'assets/theme.less'
import FastClick from 'fastclick' // 解决移动端300毫秒延迟
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import VueLazyload from 'vue-lazyload'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}
Vue.use(ElementUI)
Vue.use(MuseUI)
Vue.use(Toast)
Vue.use(VueLazyload)
Vue.prototype.$http = Axios // 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()等
Vue.prototype.$video = Video

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
