const path = require('path')

const config = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: ['ts-loader']
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'standard-loader',
                options: {
                    typeCheck: true,
                    emitErrors: true
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.json']
    },
    target: "node",
    node: {
        __dirname: false
    },
    devServer: {
        stats: "errors-only",
        host: process.env.HOST,
        port: process.env.PORT,
    }
}

module.exports = [
    Object.assign(
        {
            target: 'server',
            entry: { server: './src/server.ts' }
        },
        config)
]