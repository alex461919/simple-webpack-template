const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');



const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');
const PUBLIC_DIR = path.resolve(__dirname, 'public')

module.exports = {
    mode: 'production',
    entry: {
        app: path.resolve(SRC_DIR, 'main.js')
    },
    output: {
        path: DIST_DIR,
        publicPath: '',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
    },
    plugins: [
        new CleanWebpackPlugin({verbose: true}),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            BASE_URL: ''
        }),
        new HtmlWebpackPlugin({
            title: 'Задачи на сегодня',
            template: path.resolve(PUBLIC_DIR,'index.html')
        }),
        new CopyWebpackPlugin([
            {
                from: PUBLIC_DIR,
                to: DIST_DIR,
                toType: 'dir',
                ignore: [
                    {
                        glob: 'index.html',
                        matchBase: false
                    }
                ]
            }
        ])
    ]
};