const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');

const devConfig = {
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name]-[chunkhash:8].bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    // {
                    //   grid:true
                    // },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', { loader: 'less-loader' }],
      },
    ],
  },
  plugins: [],
  devServer: {
    // 自动添加 HotModuleWebpackPlugin
    hot: true,
    client: {
      // 配置当 webpack 编译警告或出错时，是否在浏览器显示
      overlay: {
        warnings: false, // 显示警告
        errors: true, // 显示错误
      },
      progress: true,
    },
  },
};

module.exports = merge(baseConfig, devConfig);
