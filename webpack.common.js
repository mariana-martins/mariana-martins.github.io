const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

module.exports = {
  entry: {
    app: './app/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              query: {
                minimize: true
              }
            },
            {
              loader: 'sass-loader'
            },
          ]
        })
      },
      {
        test: /\/fonts\/.+.(woff|woff2|ttf|svg|eot)$/,
        loader: 'url-loader'
      },
      {
        test: /\.marko$/,
        loader: 'marko-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: 'img/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.pdf$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: 'app/googlea2a2b3302a7c7b35.html' },
      { from: 'app/manifest.json' },
    ]),
    new ExtractTextPlugin('bundle.css', {allChunks: true}),
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    new GoogleFontsPlugin({
      fonts: [
        { family: "Montserrat Alternates" },
        { family: "Inconsolata" },
        { family: "Montaga" }
      ]
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      Tether: 'tether'
    })
  ],
  resolve: {
    extensions: ['.js', '.marko']
  }
};