var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './src/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel-loader'],
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.js$/,
        include: /semantic/,
        loaders: ['imports-loader?this=>window']
      },
      {
        test: /\.(png|jpg|jpeg|svg|woff|woff2|ttf|eot)$/i,
        loaders: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};
