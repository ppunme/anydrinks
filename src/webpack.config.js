var publicPath = require("./config.json").basePath;

module.exports = {
  output: {
    publicPath,
  },
  devServer: {
    publicPath,
    historyApiFallback: {
      index: publicPath,
    },
  },
};
