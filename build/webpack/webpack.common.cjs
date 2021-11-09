const path = require("path");

module.exports = {
	entry: path.join(__dirname, "../../", "views/webpack-bundels.jsx"),
	output: {
		path: path.join(__dirname, "../../", "public"),
		filename: "[name].bundle.js",
		chunkFilename: "[id].js",
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			// {
			// 	test: /\.s?css$/i,
			// 	use: [
			// 		// [style-loader](/loaders/style-loader)
			// 		{ loader: "style-loader" },
			// 		// [css-loader](/loaders/css-loader)
			// 		{
			// 			loader: "css-loader",
			// 			options: {
			// 				sourceMap: true,
			// 				modules: true,
			// 			},
			// 		},
			// 		// [sass-loader](/loaders/sass-loader)
			// 		{
			// 			loader: "sass-loader",
			// 			options: {
			// 				sourceMap: true,
			// 			},
			// 		},
			// 	],
			// },
			// {
			// 	test: /\.(png|svg|jpg|jpeg|gif)$/i,
			// 	use: ["file-loader"]
			// },
			// {
			// 	test: /\.(woff|woff2|eot|ttf|otf)$/i,
			// 	type: "asset/resource",
			// },
			// {
			// 	test: /test\.js$/,
			// 	use: "mocha-loader",
			// 	exclude: /node_modules/,
			// },
		],
	},
	// optimization: {
	// 	runtimeChunk: "single",
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			vendor: {
	// 				test: /[\\/]node_modules[\\/]/,
	// 				name: "vendors",
	// 				chunks: "all",
	// 			},
	// 		},
	// 	},
	// },
};

//Minimizing For Production
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// module.exports = {
// 	plugins: [
// 		new MiniCssExtractPlugin({
// 			filename: "[name].css",
// 			chunkFilename: "[id].css",
// 		}),
// 	],
// 	module: {
// 		rules: [
// 			{
// 				test: /\.css$/,
// 				use: [MiniCssExtractPlugin.loader, "css-loader"],
// 			},
// 		],
// 	},
// 	optimization: {
// 		minimizer: [
// 			// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
// 			// `...`,
// 			new CssMinimizerPlugin(),
// 		],
// 	},
// };

//Extracting all CSS in a single file
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// module.exports = {
// 	optimization: {
// 		splitChunks: {
// 			cacheGroups: {
// 				styles: {
// 					name: "styles",
// 					type: "css/mini-extract",
// 					// For webpack@4
// 					// test: /\.css$/,
// 					chunks: "all",
// 					enforce: true,
// 				},
// 			},
// 		},
// 	},
// 	plugins: [
// 		new MiniCssExtractPlugin({
// 			filename: "[name].css",
// 		}),
// 	],
// 	module: {
// 		rules: [
// 			{
// 				test: /\.css$/,
// 				use: [MiniCssExtractPlugin.loader, "css-loader"],
// 			},
// 		],
// 	},
// };

//
//
//
