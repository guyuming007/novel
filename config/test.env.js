/**
 * Created by Administrator on 2018/9/6.
 */
const merge = require("webpack-merge")
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_HOST: '"/api"'
})
