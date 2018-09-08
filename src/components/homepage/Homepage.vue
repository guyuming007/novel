<template>
  <div class="homepage">
    <header class="container-fluid topShow">
      <div class="container">
        <h2 class="pull-left title">移动阅读 <small>根据分类目录查找小说</small></h2>
        <div class="input-group pull-left">
          <input type="text" class="form-control" placeholder="请输入书名/作者名" aria-describedby="basic-addon2" v-model="author">
          <div class="input-group-addon" id="basic-addon2">
            <span class="glyphicon glyphicon-search"></span>
          </div>
        </div>
      </div>
    </header>

    <ul class="list"></ul>

    <div class="middle">
      <nav class="container-fluid content">
        <div class="container">
          <div class="currentLocation">
            <div class="pull-left">
              <h4>当前位置:全部>小说</h4>
            </div>
            <router-link to="/bookClass" class="pull-right searchAll">
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
          <h4>本页热门图书</h4>
        </div>
        <div v-for="item in books" class="popBooks">
          <div class="book"  @click="Jump(item._id)">
            <div class="pull-left">
              <img :src='"http://statics.zhuishushenqi.com"+item.cover+"-covers"' alt="">
            </div>
            <div class="pull-left">
              <h3 class="pull-left"> {{item.title}}</h3>
              <h4 class="pull-left">作者:{{item.author}}</h4>
              <h5>{{item.shortIntro}}</h5>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="container-fluid">
      {{fatherCateChange}}
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
        id: {},
        author: '',
        fatherCate: this.$route.query.major
      }
    },
    computed: {
//      computed是计算属性的getter，实时响应的，methods是方法 比如点击事件。
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
        sort(arr1)
        return arr1
      },
      fatherCateChange: function () {
        let arr = this.fatherCate
        if (arr) {
          this.$http.get(this.$api.getBook + 'category-info?gender=male&type=hot&major=' + arr + '&minor=&start=0&limit=20').then(res => {
            res = res.data
         //   console.log(res)
            this.books = res.books
          }).catch(error => {
            alert(error)
          })
        }
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
      },
      getNovel: function () {
        let reg = /^([\u4E00-\u9FA5]+，?)+$/
        let value = this.author
      //  console.log(value)
        let yse = value.match(reg)
        if (yse) {
          let url = this.$api.getBook + 'search?keyword='
          url += value
          $.ajax({
            url: url,
            type: 'get',
            async: true,
            dataType: 'json',
            success: function (data) {
              var books = data.books
              var str = ''
              for (var i = 0; i < books.length; i++) {
                str += '<li>' + books[i].title + '</li>'
              }
            //  console.log(str)
              var $str = $(str)
              $('.list').html(str)
            },
            error: function (res) {
              alert(res)
            }
          })
        } else {
          $('.list').children().remove()
        }
      },
      minorCateChange: function (i) {
        console.log(i)
        let arr = i[0]
        this.$http.get(this.$api.getBook + 'category-info?gender=male&type=hot&major=' + arr + '&minor=&start=0&limit=20').then(res => {
          res = res.data
          console.log(res)
          this.novel = res.books
      //    console.log(this.novel)
        }).catch(error => {
          alert(error)
        })
      }
    },
    watch: {
      author: function (newAuthor, oldAuthor) {
        this.getNovel()
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

  .topShow{
    height: 100px;
    background: #ffffff;
    position: fixed;
    top:0;
  }
  .topShow .title{
    margin-top:10px;
    margin-bottom: 0;
    height: 33px;
    overflow: hidden;
  }
  .topShow .title small{
   font-size: 15px;
   overflow: hidden;
   text-overflow:ellipsis;
  }
  .topShow .input-group{
    margin-top: 15px;
    clear: both;
  }
  .topShow .glyphicon-search{
    color:#fff;
  }
  .topShow #basic-addon2{
    background: #EF9B47;
    cursor: pointer;
  }
  .topShow #basic-addon2:hover{
    background: orangered;
  }

  .middle{
    margin-top: 100px;
  }
  .content{
    background: #EF9B47;
    color: #ffffff;
  }
  .content .searchAll{
    color:#ffffff;
    cursor: pointer;
    margin-top: 5px;
    font-size: 16px;
    font-weight: 700;
  }
  .content .currentLocation{
    overflow:hidden;
  }
  .content .majorCate .pull-left{
    margin-left:12px;
    margin-top: 0;
  }

  .container{
    clear:both;
  }
  .container .popBooks{
    clear:both;
  }
  .container .popBooks .book{
    background: #ffffff;
    display: flex;
    margin-bottom: 15px;
  }
  .container .popBooks .book h3{
    margin-top: 0;
  }
  .container .popBooks .book h4{
    clear:both;
    margin-top: 0;
  }
  .container .popBooks .book h5{
    clear:both;
    display: -webkit-box;
    max-width: 400px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  footer{
    background: #ffffff;
    margin-top: 15px;
  }

  .list {
    width: 100%;
    clear: both;
    padding: 0 3px;
    background: #f3f3f3;
  }

  .list li{
    width: 100%;
    height: 32px;
    line-height: 32px;

  }

  .list li:hover{
    background: #f50;
  }
</style>
