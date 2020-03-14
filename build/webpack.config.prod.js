const path = require('path')
// const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const glob = require('glob-all')
const PurifyCSS = require('purifycss-webpack')
// 压缩css
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
// 每次打包清理构建目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',

  devtool: 'source-map',

  plugins: [
    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**']
    }),
    // 清除无用 css---生产环境---csstree-shaking
    new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径文件
        path.resolve(__dirname, '..', 'src/*.html'),
        path.resolve(__dirname, '..', 'src/*.js'),
        path.resolve(__dirname, '..', 'src/**/*.jsx')
      ])
    }),
    new OptimizeCssPlugin()
  ]
})
