import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../components/homepage/Homepage'
import BookClass from '../components/bookclass/BookClass.vue'
import BookInfo from '../components/bookInfo/BookInfo.vue'
import BookContent from '../components/bookContent/BookContent.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Homepage', component: Homepage},
    {path: '/bookClass', name: 'BookClass', component: BookClass},
    {path: '/bookInfo', name: 'BookInfo', component: BookInfo},
    {path: '/bookContent', name: 'BookContent', component: BookContent}
  ]
})
