const path = require('path');
const { assert } = require('chai');
describe('webpack.base.js test case', () => {
  const baseConfig = require('../../src/webpack.base');
  // console.log(baseConfig);
  it('entry', () => {
    // assert.typeOf('3', 'string');
    // console.log(path.resolve(process.cwd(), 'src/index/index.js'));
    // console.log(path.normalize(baseConfig.entry.index));
    assert.equal(path.normalize(baseConfig.entry.index), path.resolve(process.cwd(), 'src/index/index.js'));
  });
});
