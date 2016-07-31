var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'src'),
      loaders: ['react-hot', 'babel-loader'],
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'boombox-js': path.join(__dirname, 'node_modules', 'boombox.js', 'boombox.js'),
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    amd: {
      'boombox-js': true
    }
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
