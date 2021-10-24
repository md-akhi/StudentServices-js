const { merge } = require("webpack-merge");
const WPConfig = require("./webpack.config.js");

module.exports = merge(WPConfig, {
  mode: "production",
});
