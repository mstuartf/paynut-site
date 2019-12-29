const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CustomExtractor = require('./purgecss.extractor');

module.exports = {

    mode: process.env.NODE_ENV,

    entry: {
        main: "./src/main.ts",
        styles: "./src/styles.css",
        register: "./src/register.ts"
    },

    output: {
        filename: "./[name].bundle.js"
    },

    module: {

        rules: [

            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader'],
                }),
            },

            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {name: '[name].[ext]?[hash]'}
            }

        ]

    },

    plugins: [

        // don't inline styles in the JS bundle but make a separate CSS bundle
        new ExtractTextPlugin('styles.css'),

        // build a file for the register page importing styles and the register bundle
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/index.html',
            chunks: ['main', 'styles'],
            filename: './index.html',
            favicon:  './src/favicon.ico'
        }),

        // build a file for the register page importing styles and the register bundle
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/register.html',
            chunks: ['register', 'styles'],
            filename: './register.html',
            favicon:  './src/favicon.ico'
        }),

        // use Purge CSS to filter out unused styles to reduce the CSS bundle size
        new PurgecssPlugin({
            paths: ['src/index.html', 'src/register.html'],
            extractors: [{extractor: CustomExtractor, extensions: ['css', 'html']}]
        })

    ]

};
