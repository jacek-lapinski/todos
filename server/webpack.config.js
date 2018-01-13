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
                loader: ['ts-loader'],
            },
            {
                test: /\.json$/, 
                enforce: 'pre',
                loader: ['json-loader'],
                include: ['./config/development.config.json']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.json']
    },
    target: "node",
    node: {
        __dirname: false
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