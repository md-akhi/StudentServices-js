const path = require("path");

//const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
  target: "web",

	devtool: "eval-cheap-module-source-map",

	output: {
		path: path.resolve(__dirname, "../../", "src", "public"),
		filename: "js/[name].js",
		publicPath: "/",
	},
};

// stats: {
// 	//colors: true,
// 	errorDetails: true,
// },
