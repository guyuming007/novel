<template>
  <div class="homepage">
    <header class="container-fluid">
      <div class="container">
        <h1 class="pull-left">移动阅读 <small>根据分类目录查找小说</small></h1>
        <div class="input-group pull-left">
          <input type="text" class="form-control" placeholder="请输入书名,作者名或者小说类型" aria-describedby="basic-addon2">
          <div class="input-group-addon" id="basic-addon2">
            <span class="glyphicon glyphicon-search"></span>
          </div>
        </div>
      </div>
    </header>

    <nav class="container-fluid content">
      <div class="container">
        <div class="currentLocation">
          <div class="pull-left">
            <h4>当前位置:全部>小说</h4>
          </div>
          <router-link to="/searchAll" class="pull-right searchAll">
            全部分类搜索<span class="glyphicon glyphicon-search"></span>
          </router-link>
        </div>
        <div class="majorCate" v-for="item in majorCateChange">
          <h5 class="pull-left">{{item}}</h5>
        </div>
      </div>
    </nav>

    <section class="container">
      <div class="pull-left">
        <h4>本业热门图书</h4>
      </div>
      <div v-for="item in books" class="PopularBooks">
        <div class="PopularBook">
          <div class="pull-left">
            <img :src='"http://statics.zhuishushenqi.com"+item.cover+"-covers"' alt="">
          </div>
          <div class="pull-left">
            <h3 class="pull-left"> {{item.title}}</h3>
            <h4 class="pull-left">作者:{{item.author}}</h4>
            <h5>{{item.shortIntro}}</h5>
          </div>
          <div @click="Jump(item._id)">
            <span class="glyphicon glyphicon-eye-open pull-right"></span>
          </div>
        </div>
      </div>
    </section>

    <footer class="container-fluid">
      <a href="#">网上看书小说网 看书阁小说网 看书吧小说网 看书窝小说网 在线看书小说网 看书啦小说网 我看书斋小说网 免费看书小说网 91看书小说网 91熊猫看书小说网 酷酷看书小说网 品书网小说网 猫扑中文小说网 去看书小说网 69书吧小说网 52小说网 00小说网 书城小说网 偷情小说网 禁忌恋小说网 屌丝小说网 手机小说</a>
    </footer>
  </div>
</template>
<script>
  export default {
    props: {
      books: {},
      majorCate: {}
    },
    data () {
      return {
        id: {}
      }
    },
    computed: {
//      computed是计算属性，实时响应的，methods是方法 比如点击事件。
      majorCateChange: function () {
        let arr = this.majorCate
        let arr1 = []
        for (let a = 0; a < arr.length; a++) {
          if (arr1.indexOf(arr[a]) === -1) arr1.push(arr[a])
        }
        function sort (arr1) {
          for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr1.length - 1; j++) {
              if (arr1[j].length > arr1[j + 1].length) {
                let temp = arr1[j]
                arr1[j] = arr1[j + 1]
                arr1[j + 1] = temp
              }
            }
          }
          return arr1
        }
        console.log(sort(arr1))
        return arr1
      }
    },
    methods: {
      // 路由跳轉
      Jump (e) {
        this.$router.push({
          path: '/bookInfo',
          query: {
            id: e
          }
        })
      }
    }
  }
</script>
<style>
  *{
    margin: 0;
    padding: 0;
  }
  a,a:link,a:visited,a:hover,a:active{
    text-decoration: none;
    color:#ccc;
  }

  .homepage{
     background: #f3f3f3;
  }
  .container{
    width: 95%;
  }

  header{
    height: 130px;
    background: #ffffff;
    margin-bottom: 20px;
  }
  header .input-group{
    margin-top: 15px;
    clear: both;
  }
  header .glyphicon-search{
    color:#fff;
  }
  header #basic-addon2{
    background: #EF9B47;
    cursor: pointer;
  }
  header #basic-addon2:hover{
    background: orangered;
  }

  .content{
    background: #EF9B47;
    color: #ffffff;
  }
  nav .searchAll{
    color:#ffffff;
    cursor: pointer;
    margin-top: 5px;
    font-size: 16px;
    font-weight: 700;
  }
  nav .currentLocation{
    overflow:hidden;
  }
  nav .majorCate .pull-left{
    margin-left:12px;
  }

  section{
    clear:both;
  }
  section .PopularBooks{
    clear:both;
  }
  section .PopularBooks .PopularBook{
    background: #ffffff;
    display: flex;
    margin-bottom: 15px;
    position: relative;
  }
  section .PopularBooks .PopularBook h3{
    margin-top: 0;
  }
  section .PopularBooks .PopularBook h4{
    clear:both;
    margin-top: 0;
  }
  section .PopularBooks .PopularBook h5{
    clear:both;
    display: -webkit-box;
    max-width: 400px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden
  }
  section .glyphicon-eye-open{
    font-size:25px;
    position: absolute;
    top: 25px;
    right: 15px;
  }

  footer{
    background: #ffffff;
    margin-top: 15px;
  }
</style>
