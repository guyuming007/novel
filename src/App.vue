<template>
  <div id="app">
    <router-link to="/bookInfo"></router-link>
    <!-- router-view 路由出口, 路由匹配到的组件将渲染在这里 -->
    <router-view :books="books" :majorCate="majorCate"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      books: {},
      majorCate: {}
    }
  },
  created () {
    let self = this
    this.$http.get(this.$api.getBook + 'rank/54d42d92321052167dfb75e3').then(res => {
      res = res.data
 //     console.log(res)
      this.books = res.ranking.books
 //     console.log(this.books)
      self.majorCate = []
      for (let i = 0; i < self.books.length; i++) {
        self.majorCate.push(self.books[i].majorCate)
      }
 //     console.log(self.minorCate)
    }).catch(error => {
      alert(error)
    })
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>

<!--http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1377690%2F_1377690_260827.jpg%2F-covers-->
