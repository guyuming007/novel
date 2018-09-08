/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = ''
let routerMode = 'hash'

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'developent') {

} else if (process.env.NODE_ENV === 'production') {

}

let apiUrl = process.env.API_HOST

let api = {
  'getBook': apiUrl
}

export {
  baseUrl,
  routerMode,
  api
  }
