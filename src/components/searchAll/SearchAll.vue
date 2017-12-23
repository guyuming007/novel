<template>
  <div class="allClassifiedSearch">
    <header class="container-fluid header">
      <div class="container">
        <div class="top">
          <router-link to="/" class="pull-left icon">
            <span class="glyphicon glyphicon-chevron-left"></span>
          </router-link>
          <h3 class="search">搜索</h3>
          <router-link to="/" class="homePage">
            <h4>首页</h4>
          </router-link>
        </div>
      </div>
    </header>

    <section class="container section">
      <div class="input-group pull-left">
        <input type="text" class="form-control" placeholder="书名/作者名" aria-describedby="basic-addon2">
        <div class="input-group-addon" id="basic-addon2">
          <span class="glyphicon glyphicon-search"></span>
        </div>
      </div>
    </section>

    <nav class="container-fluid nav">
      <div class="container">
        <div class="hotSearch">
          <div class="pull-left">
            <h4>热门搜索</h4>
          </div>
        </div>
        <div class="classification row">
          <div v-for="item in majorCateChange">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              <div class="button">{{item}}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <footer class="container-fluid">
      <a href="#" style="color: #999;">网上看书小说网 看书阁小说网 看书吧小说网 看书窝小说网 在线看书小说网 看书啦小说网 我看书斋小说网 免费看书小说网 91看书小说网 91熊猫看书小说网 酷酷看书小说网 品书网小说网 猫扑中文小说网 去看书小说网 69书吧小说网 52小说网 00小说网 书城小说网 偷情小说网 禁忌恋小说网 屌丝小说网 手机小说</a>
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
      }
    },
    computed: {
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
    components: {
    }
  }
</script>

<style>
  .allClassifiedSearch{
    background: #f3f3f3;
  }

  .header{
    border-bottom: 1px #cbcbcb solid;
    position: relative;
    display: -webkit-box;
    background: #EF9B47;
    height: 43px;
  }
  .header .top{
    display: -webkit-box;
    line-height: 43px;
    -webkit-box-flex: 1;
  }
  .header .search{
    -webkit-box-flex: 1;
    text-align: center;
    color: #ffffff;
    margin-top: 10px;
    font-size: 20px;
    font-weight: 700;
  }
  .header .homePage,.header .icon{
    color: #ffffff;
  }

  .section{
    margin-bottom: 15px;
  }

  .nav{
    background: #ffffff;
    color: black;
    margin-bottom: 15px;
  }
  .nav .classification{
    clear: both;
  }
  .nav .classification .button{
    -webkit-box-flex: 1;
    height: 32px;
    text-align: center;
    color: #333;
    font-size: 13px;
    line-height: 32px;
    margin: 11px 0;
    border: 1px #d2d6d8 solid;
    background: #f3f3f3
  }
</style>
