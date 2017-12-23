import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../components/homepage/Homepage'
import SearchAll from '../components/searchAll/SearchAll'
import BookInfo from '../components/bookInfo/BookInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Homepage', component: Homepage},
    {path: '/searchAll', name: 'SearchAll', component: SearchAll},
    {path: '/bookInfo', name: 'BookInfo', component: BookInfo}
  ]
})
