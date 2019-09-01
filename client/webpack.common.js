require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['../client/src/components/index.js'],
  output: {
    path: path.join(__dirname, '..', 'app', 'assets', 'javascripts'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    modules: [__dirname, path.resolve(__dirname, './node_modules')],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({ ...process.env }),
  ],
  performance: {
    maxEntrypointSize: 612000,
    maxAssetSize: 612000,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?name=[name].[ext]',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader:
          'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]',
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader:
          'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]',
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader:
          'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]',
      },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
    ],
  },
};
