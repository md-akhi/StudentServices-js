const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "production",
	//devtool: "source-map",
	output: {
		path: path.resolve(__dirname, "../../", "dist", "public"),
		filename: "js/[chunkhash].js",
		publicPath: "/public",
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[contentHash].css",
			chunkFilename: "css/[contentHash].css",
		}),
	],
};
