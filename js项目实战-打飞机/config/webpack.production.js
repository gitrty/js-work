const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../bundle/'),
    filename: 'main.min.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    })
  ]
}