const path = require('path')
// const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const glob = require('glob-all')

// 多进程压缩js代码
const TerserWebpackPlugin = require('terser-webpack-plugin');
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 去除未使用的css
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// 缓存模块文件
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const smp = new SpeedMeasurePlugin()
// 每次打包清理构建目录
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../src'),
};
const config = merge(baseConfig, {
  mode: 'production',

  devtool: 'source-map',

  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
          parallel: true,
          exclude:path.resolve(__dirname,'../','/node_modules'),
          include: path.join(__dirname, '../src'),
          cache: true,
      }),
    ],
    splitChunks: {
      //分割代码块
      cacheGroups: {
        vendor: {
          //第三方依赖
          priority: 1, //设置优先级，首先抽离第三方模块
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 1 //最少引入了1次
        },
        //缓存组
        common: {
          //公共模块
          chunks: 'initial',
          name: 'common',
          minSize: 100, //大小超过100个字节
          minChunks: 3 //最少引入了3次
        }
      }
    }
  },

  plugins: [
    
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录
    }),
    // 清除无用 css---生产环境---csstree-shaking
    new PurgecssWebpackPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),

    new HardSourceWebpackPlugin(),
  ]
})

module.exports = smp.wrap(config)
