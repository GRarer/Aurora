const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './out/App.js'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  devtool: 'source-map',
  module:  {
    rules: [
      {
        test: /\.js$/,
        use: [ "source-map-loader" ],
        enforce: "pre"
      }
    ]
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanBeforeEveryBuildPatterns: [ "*.html", "*.js" ],
    }),
  ],
};
