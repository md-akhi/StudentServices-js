const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	//devtool: "source-map",

	stats: {
		//colors: true,
		errorDetails: true,
	},
	output: {
		path: path.resolve(__dirname, "../../", "src", "public"),
		filename: "js/[name].js",
		publicPath: "public",
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[id].css",
			chunkFilename: "css/[id].css",
		}),
	],
};
