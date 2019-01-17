const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        filename: 'neonatev5.[hash].js',
        path: path.resolve(__dirname, 'docs')
    },
    plugins: [
        new CleanWebpackPlugin(path.resolve(__dirname, 'docs/**/*')),
        new HtmlWebpackPlugin({template: path.resolve(__dirname, 'src' ,'html', 'index.template.html')})
    ]
}
