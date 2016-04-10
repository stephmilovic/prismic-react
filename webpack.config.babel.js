import NpmInstallWebpackPlugin from 'npm-install-webpack-plugin';
import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import isDev from 'isdev';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { Dir } from './server/config';

const TARGET = process.env.npm_lifecycle_event;

const sassNeatPaths = require('node-neat').with([
  path.resolve(__dirname, './app/sass/assets/sass')
]).map(neatPath => 'includePaths[]=' + neatPath).join('&');


let Config = {
  entry: [
    'babel-polyfill',
    path.join(Dir.app, 'index.jsx'),
  ],
  output: {
    path: path.join(Dir.public, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      include: Dir.src,
    }],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap&' + sassNeatPaths),
      //	include: /flexboxgrid/,
      }, {
        test: /\.svg$/,
        loader: 'file-loader',
      }, {
        test: /\.(png|jpg|gif|ico)$/,
        loader: 'url?limit=25000',
      },
    ],
  },
  resolve: {
    root: Dir.src,
    extensions: ['', '.js', '.jsx', '.json', '.scss'],
  },
  postcss: [autoprefixer],
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),  // compiled css (single file only)
  ],
};

if (TARGET === 'build' && !isDev) {
  Config = merge(Config, {
    bail: true,
    devtool: 'source-map',
    output: { publicPath: '/build/' },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        dropDebugger: true,
        dropConsole: true,
        compressor: {
          warnings: false,
        },
      }),
    ],
  });
}

if (TARGET === 'server:dev' && isDev) {
  Config = merge(Config, {
    devtool: 'eval',
    entry: ['webpack-hot-middleware/client'],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new NpmInstallWebpackPlugin({ save: true }),
    ],
  });
}

export default Config;
