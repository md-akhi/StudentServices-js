const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "production",
	target: "node",
	externals: [nodeExternals()],
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
