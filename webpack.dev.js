const { merge } = require("webpack-merge");
const WPConfig = require("./webpack.config.js");

module.exports = merge(WPConfig, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		contentBase: "./public",
	},
});
