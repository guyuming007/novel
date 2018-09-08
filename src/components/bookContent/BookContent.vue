<template>
  <div>
    <header class="container-fluid novelTitle">
      <div class="container">
        <div>
          <span class="glyphicon glyphicon-chevron-left pull-left" @click='back(arr)'></span>
          <h3>{{title}}</h3>
        </div>
      </div>
    </header>

    <Loading v-show="showLoading"></Loading>

    <section class='novelContent'>
      <strong></strong>
    </section>
   </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    props: {},
    data () {
      return {
        link: {},
        cp: '',
        title: '',
        arr: {},
        showLoading: true
      }
    },
    computed: {
      // ...mapState(['showLoading'])
    },
    created () {
      this.arr = this.$route.query.id
      let self = this
      this.$http.get(this.$api.getBook + 'book-sources?view=summary&book=' + this.arr).then(res => {
        res = res.data
        let id = res[0]._id
      //  console.log(id)
        let url = this.$api.getBook + 'book-chapters/'
        $.ajax({
          url: url + id,
          type: 'get',
          async: true,
          dataType: 'json',
          success: function (data) {
            self.link = data.chapters[0].link
          //  console.log(self.link)
          },
          error: function (res) {
            alert(res)
          }
        })
      }).catch(error => {
        alert(error)
      })
    },
    methods: {
      getNovel (e) {
        this.$http.get(this.$api.getBook + 'chapters/' + e).then(res => {
          res = res.data
          this.cp = res.chapter.cpContent.replace(/[\n\n]/g, '<br/>')
        //  console.log(this.cp)
          $('.novelContent strong').html(this.cp)
          this.title = res.chapter.title
          this.showLoading = false
        }).catch(error => {
          alert(error)
        })
      },
      back (g) {
        this.$router.push({
          path: '/bookInfo',
          query: {
            id: g
          }
        })
      }
    },
    watch: {
      link: function (newLink, oldLink) {
        let vip = newLink.replace(/:/g, '%3A').replace(/[/]/g, '%2f').replace(/[?]/g, '%3f').replace(/=/g, '%3d')
        this.getNovel(vip)
      }
    }
  }
</script>

<style>
  .novelTitle{
    width: 100%;
    background: #EF9B47;
    height: 45px;
    color:#ffffff;
    position: fixed;
    top: 0;
  }
  .novelTitle .glyphicon-chevron-left{
    color: #ffffff;
  }
  .novelTitle h3{
    margin-top: 10px;
    font-size: 22px;
    height: 26px;
    overflow: hidden;
  }

  .novelContent{
    margin-top: 45px;
    background: #EEE6DD;
    font-size: 18px;
    line-height: 35px;
    font-family:宋体;
    padding: 15px 15px 0 15px;
    color: black;
    text-align: justify;
    text-indent:2em;
  }
</style>
