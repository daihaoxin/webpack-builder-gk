const FriendlyErrorsWebpackPlugin = require('@nuxt/friendly-errors-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { setMPA } = require('./build-tools/tools');
const { entry, htmlWebpackPlugins } = setMPA();
module.exports = {
  entry,
  output: {
    // v5.20.0+  在生成文件之前清空 output 目录
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'img/[name]_[hash:8].[ext]',
        },
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       name: 'img/[name]_[hash:8].[ext]',
        //       limit: 10240, // 10k
        //     },
        //   },
        // ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]_[hash:8].[ext]',
        },
        // use: [
        //   {
        //     loader: 'file-loader',
        //     options: {
        //       name: '[name]_[hash:8][ext]'
        //     }
        //   }
        // ]
      },
    ],
  },
  stats: 'errors-only',
  plugins: [
    new ESLintPlugin(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false,
    }),
    function () {
      this.hooks.done.tap('done', (stats) => {
        // console.log(stats);
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log('build error');
          process.exit(1);
        } else {
          console.log('successful !!!!!!!!!!!!!!!!!!!!!!!');
        }
      });
    },
    ...htmlWebpackPlugins,
  ],
};
