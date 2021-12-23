const path = require('path');
const webpack = require('webpack');
const Mocha = require('mocha');
const basePath = process.cwd();
const mocha = new Mocha({
  timeout: '10000ms',
});
process.chdir(path.join(__dirname, 'template'));
const webpackConfig = require(path.join(basePath, 'src/webpack.pro'));
webpack(webpackConfig, (error, stats) => {
  if (error) {
    console.log(error);
    process.exit(2);
  }
  // console.log(
  //   stats.toString({
  //     colors: true,
  //     modules: false,
  //     children: false,
  //   }),
  // );
  mocha.addFile('../html.test.js');
  mocha.addFile('../css-js.test.js');
  mocha.run();
});
