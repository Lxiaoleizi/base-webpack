const path = require('path')
// 自动生成html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 分离css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//拷贝静态资源
const CopyWebpackPlugin = require('copy-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')

// 缓存模块文件
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

// 每次打包清理构建目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: ['./src/index.js'],

  mode: 'development',

  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    filename: '[name].[hash:6].js',
    chunkFilename: '[name].[hash:6].js'
  },

  // 配置打包规则
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      pages: path.resolve(__dirname, '../src/pages'),
      router: path.resolve(__dirname, '../src/router')
    }
  },

  // 通过cdn导入的包不需要打包
  externals: {
    //jquery通过script引入之后，全局中即有了 jQuery 变量
    jquery: 'jQuery'
  },

  optimization: {
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

  module: {
    // 当一些模块不是AMD/COmmonjs规范的时候 webpack不进行转化解析
    // noParse: /jquery|lodash/,

    rules: [
      // 解析js
      {
        test: /\.js|.jsx$/,
        // exclude: /node_modules/,
        include: [path.resolve(__dirname, '../', 'src')],
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      // 解析css, less
      {
        test: /\.(c|le)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          // MiniCssExtractPlugin.loader,
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
        include: [path.resolve(__dirname, '../', 'src')]
      },

      // 编译图片
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
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
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              // publicPath: 'fonts/',
              outputPath: 'assets/fonts/'
            }
          }
        ],
        include: [path.resolve(__dirname, '../', 'src')]
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
      filename: 'style/[name].css'
      // chunkFilename: '[id].css'
    }),

    new CopyWebpackPlugin(
      [
        {
          from: 'public/js/*.js',
          to: path.resolve(__dirname, '../', 'dist', 'js'),
          flatten: true // 设置为 true，那么它只会拷贝文件，而不会把文件夹路径都拷贝上，大家可以不设置 flatten 时，看下构建结果。
        }
      ]
      // {ignore: []} // 配置不需要拷贝的文件
    ),

    new HardSourceWebpackPlugin(),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录
    }),

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
