/* eslint-disable @typescript-eslint/no-var-requires, no-console */
const path = require('path');
const { execSync } = require('child_process');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

console.log('Build development build for theta-market...');

const nodeEnvironment = process.env.NODE_ENV || 'development';
const appVersion = execSync('git rev-parse --short HEAD').toString().trim();
const gitCommit = execSync('git rev-parse --short HEAD').toString().trim();

console.log(`nodeEnvironment: ${nodeEnvironment}`);
console.log(`appVersion: ${appVersion}`);
console.log(`gitCommit: ${gitCommit}`);

const config = require('./webpack.base')({
  mode: 'development',

  entry: [
    require.resolve('react-app-polyfill/ie11'),
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'src/index.tsx'),
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    nodeEnv: false,
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnvironment,
      APP_VERSION: appVersion,
      GIT_COMMIT: gitCommit,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
      // favicon: 'assets/icons/favicon.png',
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
    }),
  ],

  devtool: 'eval-source-map',

  performance: {
    hints: false,
  },
});

module.exports = config;
