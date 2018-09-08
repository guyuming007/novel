const express = require('express') // nodejs开发框架express，用来简化操作

var config = require('./config/index')

var port = process.env.PORT || config.build.port

var proxyMiddleware = require('http-proxy-middleware')

const app = express() // 创建node.js的express开发框架的实例

var router = express.Router()

router.get('/', function (req, res, next) {
  req.url = '/index.html'
  next()
})

app.use(router)

//异步接口
//let appData = require('./data.json') // 引用的json地址
//
//let books = appData.books // json某一个key
//
//const apiRouter = express.Router()
//
//apiRouter.get('/books', function (req, res) {
//  res.json({
//    error: 0,
//    data: books
//  })
//})
//
//app.use('/api', apiRouter)

app.middleware = [//使用代理api
  proxyMiddleware(['/api'], {target: 'http://novel.juhe.im/',
    changeOrigin: true,
    pathRewrite: {
      '^/api' : '/',
    },}),
];

app.use(app.middleware);

//定义express静态目录
app.use(express.static('./dist'))
var autoOpenBrowser = !!config.dev.autoOpenBrowser
var uri = 'http://localhost:' + port
var opn = require('opn')

//启动express
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
