const path = require('path')
// const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const glob = require('glob-all')
const PurifyCSS = require('purifycss-webpack')
// 压缩css
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

const config = merge(baseConfig, {
  mode: 'production',

  devtool: 'source-map',

  plugins: [
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

module.exports = smp.wrap(config)
