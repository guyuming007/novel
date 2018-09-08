<template>
  <div>
    <header class="container-fluid info">
      <div class="container">
        <div class="top">
          <router-link to="/" class="pull-left">
            <span class="glyphicon glyphicon-chevron-left"></span>
          </router-link>
          <h3 class="search">{{title}}</h3>
        </div>
      </div>
    </header>

    <nav class="container-fluid image">
      <div class="container">
        <div class="pull-left">
          <img :src='"http://statics.zhuishushenqi.com"+cover+"-covers"' alt="">
        </div>
        <div>
          <h4>{{title}}</h4>
          <h4>{{author}}</h4>
          <h4>{{postCount}}小时前 | {{wordCount}}万 | {{cat}} </h4>
        </div>
      </div>
    </nav>

    <section class="container-fluid update">
      <div class="container">
        <div>
          <div class="flex">
            <div><h4>追更新</h4></div>
            <div @click="getContent(id)"><h4>开始阅读</h4></div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <h5>追书人气</h5>
            <h4>{{latelyFollower}}</h4>
          </div>
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <h5>读者留存率</h5>
            <h4>{{retentionRatio}}%</h4>
          </div>
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <h5>总章数</h5>
            <h4>{{chaptersCount}}</h4>
          </div>
        </div>
      </div>
    </section>

    <section class="container-fluid label">
     <div class="container">
       <div v-for="item in tags" class="tags">
         <div class="pull-left tag">{{item}}</div>
       </div>
     </div>
    </section>

    <footer class="container-fluid">
      <div class="container">
        <p>{{longIntro}}</p>
      </div>
    </footer>
  </div>
</template>
<script>
  export default {
    props: {},
    data () {
      return {
        title: '',
        cover: {},
        author: '',
        postCount: '',
        latelyFollower: '',
        cat: '',
        retentionRatio: '',
        wordCount: '',
        chaptersCount: '',
        tags: '',
        longIntro: '',
        id: ''
      }
    },
    created () {
      let arr = this.$route.query.id
      this.$http.get(this.$api.getBook + 'book-info/' + arr).then(res => {
//        console.log(res)
        let data = res.data
        this.title = data.title
        this.cover = data.cover
        this.author = data.author
        this.postCount = data.postCount
        this.latelyFollower = data.latelyFollower
        this.cat = data.cat
        this.retentionRatio = data.retentionRatio
        this.wordCount = parseInt(data.wordCount / 10000)
        this.chaptersCount = data.chaptersCount
        this.tags = data.tags
        this.longIntro = data.longIntro
        this.id = data._id
      }).catch(error => {
        alert(error)
      })
    },
    methods: {
      getContent (f) {
      //  console.log(f)
        this.$router.push({
          path: '/bookContent',
          query: {
            id: f
          }
        })
      }
    }
  }
</script>

<style>
  .info{
    width: 100%;
    background: #EF9B47;
    height: 45px;
    color:#ffffff;
  }
  .info .glyphicon-chevron-left{
    color: #ffffff;
  }
  .info h3{
    margin-top: 10px;
  }

  .image{
    margin-top: 10px;
  }

  .update .flex{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
  }
  .update .flex div{
    height:40px;
    line-height: 40px;
    background:#EF9B47;
    border: 1px #d2d6d8 solid;
    padding: 0 15px;
    border-radius: 5px;
    color:#ffffff;
  }

  .label .tag{
    -webkit-box-flex: 1;
    height: 32px;
    text-align: center;
    color: #333;
    font-size: 13px;
    line-height: 32px;
    border: 1px #d2d6d8 solid;
    background: #f3f3f3;
    padding: 0 15px;
    margin-right: 8px;
    margin-top: 5px;
  }
</style>
