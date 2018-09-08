<template>
  <div class="allClassifiedSearch">

    <header class="container-fluid header">
      <div class="container">
        <div class="top">
          <router-link to="/" class="pull-left icon">
            <span class="glyphicon glyphicon-chevron-left"></span>
          </router-link>
          <h3 class="search">搜索</h3>
        </div>
      </div>
    </header>

    <section class="container section">
      <div class="input-group pull-left">
        <input type="text" class="form-control" placeholder="请输入书名/作者名" aria-describedby="basic-addon2" v-model="bookTitle">
        <div class="input-group-addon" id="basic-addon2">
          <span class="glyphicon glyphicon-search"></span>
        </div>
      </div>
    </section>

    <ul class="listing"></ul>

    <nav class="container-fluid nav">
      <div class="container">
        <div class="hotSearch">
          <div class="pull-left">
            <h4>男生</h4>
          </div>
        </div>
        <div class="classification row">
          <div v-for="item in majorCateChange(male)">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 box">
              <div class="button" @click='getClass(item)'>{{item}}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <nav class="container-fluid nav">
      <div class="container">
        <div class="hotSearch">
          <div class="pull-left">
            <h4>女生</h4>
          </div>
        </div>
        <div class="classification row">
          <div v-for="item in majorCateChange(female)">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 box">
              <div class="button" @click='getClass(item)'>{{item}}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <footer class="container-fluid">

    </footer>
  </div>
</template>

<script>
  export default {
    props: {
      books: {},  // 作废
      majorCate: {} // 作废
    },
    data () {
      return {
        female: '',
        male: '',
        bookTitle: ''
      }
    },
    computed: {

    },
    created () {
      this.$http.get(this.$api.getBook + 'sub-categories').then(res => {
        res = res.data
      //  console.log(res)
        this.female = []
        for (var i = 0; i < res.female.length; i++) {
          this.female.push(res.female[i].major)
        }
     //   console.log(this.female)
        this.male = []
        for (var j = 0; j < res.male.length; j++) {
          this.male.push(res.male[j].major)
        }
      }).catch(error => {
        alert(error)
      })
    },
    methods: {
      majorCateChange (e) {
        let arr = e
      //  console.log(arr)
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
      getClass (h) {
    //    console.log(h)
        this.$router.push({
          path: '/',
          query: {
            major: h
          }
        })
      },
      getTitle: function () {
        let reg = /^([\u4E00-\u9FA5]+，?)+$/
        let value = this.bookTitle
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
          //    console.log(data)
              var books = data.books
              var str = ''
              for (var i = 0; i < books.length; i++) {
                str += '<li>' + books[i].title + '</li>'
              }
            //  console.log(str)
              var $str = $(str)
              $('.listing').html(str)
            },
            error: function (res) {
              alert(res)
            }
          })
        } else {
          $('.listing').children().remove()
        }
      }
    },
    watch: {
      bookTitle: function (nweTitle, oldTitle) {
        this.getTitle()
      }
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
    margin-top: 15px;
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
  .nav .classification .box{
    padding-right: 0;
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
    background: #f3f3f3;
  }

  .listing {
    width: 100%;
    clear: both;
    padding: 0 3px;
    background: #f3f3f3;
  }

  .listing li{
    width: 100%;
    height: 32px;
    line-height: 32px;

  }

  .listing li:hover{
    background: #f50;
  }
</style>
