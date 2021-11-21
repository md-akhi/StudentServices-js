const path = require("path");
const webpack = require("webpack");
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "production",
	output: {
		path: path.resolve(__dirname, "../../", "dist", "public"),
		filename: "/js/[chunkhash].js",
		publicPath: "/",
		pathinfo: true,
	},
	optimization: {
		minimize: true,
	},
	plugins: [
		// new MiniCssExtractPlugin({
		// 	filename: "css/[contentHash].css",
		// 	chunkFilename: "css/[contentHash].css",
		// }),
		new webpack.DefinePlugin({
			PRODUCTION: JSON.stringify(true),
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
		}),
	],
};
