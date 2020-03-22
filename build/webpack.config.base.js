/* eslint-disable*/
const path = require('path')
// 自动生成html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 分离css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//拷贝静态资源
const CopyWebpackPlugin = require('copy-webpack-plugin')
const isDev = process.env.NODE_ENV !== 'production';
const srcDir = path.join(__dirname, '../src');
const webpack = require('webpack')

module.exports = {
  entry: ['./src/index.js'],

  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    filename: '[name].[chunk:8].js',
    publicPath: '/',
    chunkFilename: 'chunk/[name].[chunkhash:8].js',
  },

  // 配置打包规则
  resolve: {
    extensions: ['.js', '.jsx'],
    mainFields: ['jsnext:main', 'browser', 'main'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      // modules: [path.resolve(__dirname, 'node_modules')],
    }
  },

  // 通过cdn导入的包不需要打包
  externals: {
    //jquery通过script引入之后，全局中即有了 jQuery 变量
    jquery: 'jQuery'
  },

  module: {
    // 当一些模块不是AMD/COmmonjs规范的时候 webpack不进行转化解析
    // noParse: /jquery|lodash/,

    rules: [{
        //前置(在执行编译之前去执行eslint-loader检查代码规范，有报错就不执行编译)
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [srcDir],
        exclude:path.resolve(__dirname,'../','/node_modules'),
        // include: [path.resolve(__dirname, '../', 'src')]
      },
      // 解析js
      {
        test: /\.js|.jsx$/,
        include: [srcDir],
        exclude:path.resolve(__dirname, '../', '/node_modules'),
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: !isDev
            }
          }
        ]
      },
      // 解析css, less
      {
        test: /\.(css|less)$/,
        exclude:path.resolve(__dirname,'../','/node_modules'),
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [require('autoprefixer')()]
              }
            }
          },
          'less-loader'
        ],
      },

      // 编译图片
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
          // include: [srcDir],
          options: {
            outputPath: 'assets/images/', // 图片输出的路径
            limit: 10 * 1024,
            name: '[name]_[hash:6].[ext]',
            esModule: false // 不然静态资源路径显示错误
          }
        }
      },

      // 解析文字
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        include: [srcDir],
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name]-[hash:5].min.[ext]',
            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
            // publicPath: 'fonts/',
            outputPath: 'assets/fonts/'
          }
        }],
        include: [path.resolve(__dirname, '../', 'src')]
      },

      {
        test: /.html$/,
        use: 'html-withimg-loader' // 解决打包后静态图片无法加载问题 但是这样配置就不能用ejs语法
      }
    ]
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 最终构建文件名称
      template: path.resolve(__dirname, '../public/index.html'),
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false //是否折叠空白
      }
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: 'chunk/[id].[contenthash:8].css',
    }),

    new CopyWebpackPlugin(
      [{
        from: 'public/js/*.js',
        to: path.resolve(__dirname, '../', 'dist', 'js'),
        flatten: true // 设置为 true，那么它只会拷贝文件，而不会把文件夹路径都拷贝上，大家可以不设置 flatten 时，看下构建结果。
      }]
      // {ignore: []} // 配置不需要拷贝的文件
    ),



    // 全局变量
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
      // Component: ['react', 'Component'],
      // Vue: ['vue/dist/vue.esm.js', 'default'], // 如果导出方式是，module.export需要加default
      // $: 'jquery',
      // _map: ['lodash', 'map']
    }) // 默认是寻找当前目录和node_modules
  ]
}