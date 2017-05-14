'use strict'
process.env.NODE_ENV = 'development'
process.env.REACT_WEBPACK_ENV = 'dev'

const webpack = require('webpack')
const base = require('./webpack.base')
const FriendlyErrors = require('friendly-errors-webpack-plugin')

base.devtool = 'eval-source-map'
base.module.loaders.push(
    {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader']
    },
    {
        test: /\.scss$/,
        use: [
            {loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'resolve-url-loader'}, {loader: 'sass-loader'},
            {

                loader: 'sass-loader',
                options: {
                    includePaths: ['./node_modules']
                }
            }
        ]
    }
)

base.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrors()
)

module.exports = base
