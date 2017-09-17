const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


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
                    use: "css-loader!sass-loader"
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
                loader: [
                    'file-loader?hash=sha512&digest=hex&name=img/[name].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('bundle.css', { allChunks: true }),
        new HtmlWebpackPlugin({
            template: 'app/index.html'
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
