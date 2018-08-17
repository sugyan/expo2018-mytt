const path = require('path');
const webpack = require('webpack');

const config = module.exports = {
    entry: './app/assets/src/main.tsx',
    output: {
        path: path.resolve(__dirname + '/app/assets/javascripts'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};

if (process.env.NODE_ENV === 'production') {
    config.plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ];
}
