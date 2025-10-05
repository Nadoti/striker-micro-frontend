const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const shared = require('../package.json').dependencies;

const devConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/login/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'login',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/bootstrap',
      },
      shared,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);