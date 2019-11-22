

module.exports = function (env) {
  env = env || env.development;

  return {
    entry: "./src/main.js",
    module: {
      rules: [
        {
          test: /\.(css|less)$/i, use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')
                ]
              }
            },
            'less-loader'
          ]
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|svg|ttf|eot)$/i, use: {
            loader: 'url-loader',
            options: {
              outputPath: '/img',
              // limit:4*1024
            }
          }
        },
        {
          test: /\.(js|jsx$)/i, use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
              // "compact": false
            }
          }
        },
        {
          test: /\.(html|htm)$/i, use: 'html-withimg-loader'
        }
      ]
    },
    // devtool: 'source-map',
    ...env.production ? require("./config/webpack.production") : require('./config/webpack.development'),
  }
}