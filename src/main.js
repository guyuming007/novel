// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueResource from 'vue-resource'
import $ from 'jquery'
import {api} from './config/env'   // 请求url链接
import Loading from './components/loading/Loading.vue'

Vue.use(VueResource)

Vue.config.productionTip = false
// 因为axios 并不能使用Vue.use方法,所以我们给Vue构造函数添加一个原型方法$axios
// 这样我们的axios就可以被Vue组建所使用
Vue.prototype.$axios = axios  // axios 不支持Vue.use(axios)

Vue.prototype.$api = api

// Vue.prototype.$http = $http  // 挂载到vue的原型

Vue.component('Loading', Loading)  // 自定义loading 组件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

router.push('/')
