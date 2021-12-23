const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const baseConfig = require('./webpack.base');
const path = require('path');

const proConfig = {
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name]-[chunkhash:8].js',
  },
  /*
   * 默认开启 tree shaking、js 代码压缩
   * */
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', { loader: 'less-loader' }],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
      // chunkFilename: "[id].css"
    }),
  ],
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      `...`,
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      /*
       * async 异步引入的库进行分离（默认行为）  import 方式引入的
       * initial  同步引入的库进行分离
       * all 所有引入的库进行分离（推荐）
       * */
      chunks: 'all',
      // 抽离公共包的最小大小
      minSize: 20000,
      minRemainingSize: 0,
      // 被引用的次数
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

module.exports = merge(baseConfig, proConfig);
