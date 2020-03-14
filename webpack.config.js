const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// moke数据
const MockerApi = require('mocker-api')
// console.log(isDev, 'smadasd')
// const config = require('./public/config')[isDev ? 'dev' : 'build']
module.exports = {
  // entry: './src/index.js',
  // 多页
  entry: {
    index: './src/index.js'
    // login: './src/login.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'), //必须是绝对路径
    // filename: 'bundle.[hash:6].js',
    filename: '[name]_[hash:6].js'
    // publicPath: '/' //通常是CDN地址
  },

  mode: isDev ? 'development' : 'production',

  // 配置webpack的解析规则
  resolve: {
    modules: ['./src/component', 'node_modules'], // 默认就是从node_module中寻找 寻找规则是从左往又
    alias: {
      // 'react-native': '@my/react-native-web' //这个包名是我随便写的哈
    }, // 映射源路径为一个新路径
    // 适配多端的项目中，可能会出现 .web.js, .wx.js，例如在转web的项目中，我们希望首先找 .web.js，如果没有，再找 .js
    extensions: ['web.js', '.js'],
    //! 首先寻找 ../dialog.web.js ，如果不存在的话，再寻找 ../dialog.js。这在适配多端的代码中非常有用，否则，你就需要根据不同的平台去引入文件(以牺牲了速度为代价)。
    // enforceExtension: true, //当设置为true 就不能省略引入文件后缀
    mainFields: ['style', 'main']
  },

  devServer: {
    port: '3000', //默认是8080
    quiet: false, //默认不启用
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: 'errors-only', //终端仅打印 error
    overlay: false, //默认不启用
    clientLogLevel: 'silent', //日志等级
    compress: true, //是否启用 gzip 压缩
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

  devtool: isDev ? 'cheap - module - eval - source - map' : 'source-map',

  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader'
            // options: {
            //   // 适配各环境
            //   presets: ['@babel/preset-env'],
            //   plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]]
            // }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader, // 替换style-loader
            options: {
              // 配置了这个不会进行css热更新 需要热更新就要进行配置
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
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, //10K
              name: '[name]_[hash:6].[ext]',
              output: 'assets', // 指定输出目录
              esModule: false // 如果不设置false 当图片使用require导入时会出现<img src=[Module Object] />
            }
          }
        ],
        exclude: /node_modules/
      }
      //   {
      //     test: /.html$/,
      //     use: 'html-withimg-loader' // 解决打包后静态图片无法加载问题 但是这样配置就不能用ejs语法
      //   }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false //是否折叠空白
      }
      // chunks: [] // 可以指定引入哪个js文件  默认是都引入 当多页应用
      //   config: config.template
    }),
    // new HtmlWebpackPlugin({
    //   template: './public/login.html',
    //   filename: 'login.html' //打包后的文件名
    // }),
    new CleanWebpackPlugin(),
    // cleanOnceBeforeBuildPatterns:['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件

    new CopyWebpackPlugin(
      [
        {
          from: 'public/js/*.js',
          to: path.resolve(__dirname, 'dist', 'js'),
          flatten: true // 设置为 true，那么它只会拷贝文件，而不会把文件夹路径都拷贝上，大家可以不设置 flatten 时，看下构建结果。
        }
      ]
      // {ignore: []} // 配置不需要拷贝的文件
    ),
    // 抽离css文件
    new MiniCssExtractPlugin({
      filename: 'style/[name].css'
      // publicPath: 'style' //单独打包到一个文件夹
    }),
    // 压缩css
    new OptimizeCssPlugin(),
    // 定义全局环境变量
    new webpack.DefinePlugin({
      DEV: JSON.stringify('dev'), //字符串
      FLAG: 'true' //FLAG 是个布尔类型
    }),
    // 热更新
    new webpack.HotModuleReplacementPlugin() //热更新插件
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
