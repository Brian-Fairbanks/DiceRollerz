const {DllReferencePlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = [{
  mode: 'development',
  entry: ['./app.scss', './app.js'],
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    // Hidden on glitch.com.
    contentBase: 'public'
  },
  plugins: [
    // Run `npm run dll` to rebuild the components static file.
    new DllReferencePlugin({
      context: __dirname,
      manifest: require('./public/components.dll.manifest.json'),
      name: 'components'
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      domain: process.env.PROJECT_DOMAIN,
      inject: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: path.resolve('fast-sass-loader.js'),
            options: {
              includePaths: ['./node_modules']
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-assign']
        },
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
}];
