const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  // ...your other webpack configurations...

  plugins: [
    new NodePolyfillPlugin()
  ]
};