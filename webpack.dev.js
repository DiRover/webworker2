/* eslint-disable import/extensions */
const { merge } = require('webpack-merge');
const Common = require('./webpack.common.js');

module.exports = merge(Common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  experiments: {
    topLevelAwait: true,
  },
});
