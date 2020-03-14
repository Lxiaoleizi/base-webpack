const path = require('path')
// 自动生成html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 分离css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//拷贝静态资源
const CopyWebpackPlugin = require('copy-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
console.log(isDev, '但是空间大萨计划的规划设计好的')
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

  module: {
    rules: [
      // 解析js
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
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
        exclude: /node_modules/
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
        ]
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

    //
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
    )

    // 全局变量
    // new webpack.ProvidePlugin({
    //   React: 'react',
    //   Component: ['react', 'Component'],
    //   Vue: ['vue/dist/vue.esm.js', 'default'], // 如果导出方式是，module.export需要加default
    //   $: 'jquery',
    //   _map: ['lodash', 'map']
    // }) // 默认是寻找当前目录和node_modules
  ]
}
