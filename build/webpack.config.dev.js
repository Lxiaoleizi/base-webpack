const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const webpack = require('webpack')
// moke数据
const MockerApi = require('mocker-api')
module.exports = merge(baseConfig, {
  mode: 'development',

  devtool: 'cheap - module - eval - source - map',

  devServer: {
    port: '3000', //默认是8080,
    contentBase: path.resolve(__dirname, '../dist'),
    host: 'localhost', // 可以使用手机访问,
    historyApiFallback: true, //  该选项的作用所有的404都连接到index.html
    // quiet: false, //默认不启用
    // inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    // stats: 'errors-only', //终端仅打印 error
    // overlay: false, //默认不启用
    // clientLogLevel: 'silent', //日志等级
    // compress: true, //是否启用 gzip 压缩
    open: true,
    hot: true,
    // proxy: {
    //   '/api': 'http://localhost:4000'
    // },
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:4000',
    //     // 重写接口
    //     pathRewrite: {
    //       '/api': ''
    //     }
    //   }
    // },
    // 本地模拟数据
    before(app) {
      // app.get('/user', (req, res) => {
      //   res.json({ name: '刘小夕' })
      // })
      MockerApi(app, path.resolve('./mock/mocker.js'))
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 定义全局环境变量
    new webpack.DefinePlugin({
      DEV: JSON.stringify('dev'), //字符串
      FLAG: 'true' //FLAG 是个布尔类型
    })
  ]
})
