// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
// 因为axios 并不能使用Vue.use方法,所以我们给Vue构造函数添加一个原型方法$axios
// 这样我们的axios就可以被Vue组建所使用
Vue.prototype.$axios = axios

// var $http = axios.create({
// })  // 创建基本的axios配置
//
// Vue.prototype.$http = $http  // 挂载到vue的原型

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

router.push('/')
