const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const deps = require('../package.json').dependencies;
const { getRemotes } = require('./remotes');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: 'auto',
    path: require('path').resolve(__dirname, '../dist'),
    clean: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app',
      filename: 'remoteEntry.js',
      remotes: getRemotes(),
      shared: {
        ...deps,
        react: { 
          singleton: true, 
          requiredVersion: deps.react,
          eager: false
        },
        'react-dom': { 
          singleton: true, 
          requiredVersion: deps['react-dom'],
          eager: false
        },
        'react-router-dom': { 
          singleton: true, 
          requiredVersion: deps['react-router-dom'],
          eager: false
        },
        '@mui/material': { 
          singleton: true, 
          requiredVersion: deps['@mui/material'],
          eager: false
        },
        '@emotion/react': { 
          singleton: true, 
          requiredVersion: deps['@emotion/react'],
          eager: false
        },
        '@emotion/styled': { 
          singleton: true, 
          requiredVersion: deps['@emotion/styled'],
          eager: false
        }
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);