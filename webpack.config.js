let path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },
  devtool: 'source-map',
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader:'babel-loader',
      //     options: {
      //       presets: [
      //         '@babel/preset-env'
      //       ]
      //     }
      //   }
      // },

      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'banner-loader', // 添加注释
      //     options: {
      //       text: 'kft',
      //       filename: path.resolve(__dirname, 'banner.js')
      //     }
      //   }
      // }

      // {
      //   test: /\.(jpg|png|gif|jpeg)$/,
      //   use: 'file-loader'
      // }

      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 0
          }
        }
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
}