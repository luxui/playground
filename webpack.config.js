module.exports = {
  devtool: '#source-map',
  entry: {
    bundle: './src/index.js'
  },
  eslint: {
    emitWarning: true
  },
  module: {
    preLoaders: [
      {
        exclude: /node_modules/,
        loaders: ['eslint-loader']
      }
    ],
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  output: {
    filename: 'build/index.js',
    sourceMapFilename: 'build/index.map'
  }
};
