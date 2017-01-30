const path = require('path');

const buildDir = path.resolve(__dirname, 'build');

module.exports = {
  devServer: {
    contentBase: buildDir,
    historyApiFallback: true,
    hot: true,
    port: 8080,
    watchContentBase: true,
  },
  entry: './src/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?presets[]=es2015'
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: buildDir,
  },
};
