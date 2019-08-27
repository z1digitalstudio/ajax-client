const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

module.exports = {
  entry: {
    'ajax-client': './src/ajax-client.ts'
  },
  devtool: 'inline-source-map',
  mode: 'production',
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_module/,
      use: 'ts-loader'
    }]
  },
  externals: {
    'rxjs': 'rxjs',
    'rxjs/ajax': 'rxjs/ajax',
    'rxjs/operators': 'rxjs/operators'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      rxjs: path.resolve('./node_modules/rxjs')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DuplicatePackageCheckerPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    library: 'ajax-client',
    libraryTarget: 'umd'
  }
};