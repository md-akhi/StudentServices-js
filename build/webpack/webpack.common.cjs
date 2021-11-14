const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pages = ["home", "users_list", "user_detail"];
// https://www.npmjs.com/package/findit
const Entry = (entry) => {
	return entry.reduce((obj, item) => {
		return {
			...obj,
			[item]: [
				path.resolve(
					__dirname,
					"../../",
					"src",
					"views",
					"helper",
					`${item}.jsx`
				),
			],
		};
	}, {});
};

const PluginHtml = (entry) => {
	return entry.map((item) => {
		return new HtmlWebpackPlugin({
			chunks: [item],
			filename: path.resolve(
				__dirname,
				"../../",
				"src",
				"public",
				"pages",
				`${item}.ejs`
			),
			template: path.resolve(
				__dirname,
				"../../",
				"src",
				"views",
				"template.ejs"
			),
		});
	});
};

module.exports = {
	entry: {
		...Entry(pages),
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
				exclude: [/node_modules/, /public/],
			},
			{
				test: /\.ejs$/,
				loader: "raw-loader",
			},
			{
				test: /\.(s[ac]ss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "/public/css",
						},
					},
					"style-loader",
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								indentWidth: 4,
								includePaths: ["/public/scss"],
							},
						},
					},
				],
			},
			{
				test: /\.(jpg|jpeg|png|svg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[md5:hash:hex].[ext]",
							publicPath: "/public/img",
							outputPath: "img",
						},
					},
				],
			},
		],
	},

	resolve: {
		extensions: [".js", ".jsx", ".json", ".mjs", ".cjs", "*"],
	},

	optimization: {
		splitChunks: {
			automaticNameDelimiter: ".",
			cacheGroups: {
				react: {
					chunks: "initial",
				},
			},
		},
	},

	plugins: [
		new CleanWebpackPlugin(),
		// Ejs pages
		...PluginHtml(pages),
	],
};

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
