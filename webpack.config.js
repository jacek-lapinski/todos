const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.tsx?$/,
                loader: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'standard-loader',
                options: {
                    typeCheck: true,
                    emitErrors: true
                }
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
    },
    target: "electron",
    node: {
        __dirname: false
    }
}

module.exports = [
    Object.assign(
        {
            target: 'electron-main',
            entry: { window: './src/window.ts' }
        },
        commonConfig),
    Object.assign(
        {
            target: 'electron-renderer',
            entry: { app: './src/app.tsx' },
            plugins: [new HtmlWebpackPlugin()]
        },
        commonConfig)
]