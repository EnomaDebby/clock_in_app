const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

common.entry.push('react-hot-loader/patch', 'webpack/hot/only-dev-server');
common.output.publicPath = '/assets/javascripts/';
common.module.rules.push({
  test: /\.jsx$/,
  exclude: /node_modules/,
  use: ['eslint-loader']
});

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '..', 'app', 'assets', 'javascripts'),
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false // true for self-signed, object for cert authority
  }
});
