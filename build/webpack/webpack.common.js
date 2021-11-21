const path = require("path"),
	HtmlWebpackPlugin = require("html-webpack-plugin");
//{ CleanWebpackPlugin } = require("clean-webpack-plugin");
//MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pages = [
	"customer/dashboard/employer/invoice_detail",
	"customer/dashboard/employer/invoice_list",
	"customer/dashboard/employer/invoice_print",
	"customer/dashboard/employer/project_add",
	"customer/dashboard/employer/project_detail",
	"customer/dashboard/employer/project_list",
	"customer/dashboard/employer/user_detail",
	"customer/dashboard/employer",
	"customer/dashboard/frelanser/invoice_detail",
	"customer/dashboard/frelanser/invoice_list",
	"customer/dashboard/frelanser/invoice_print",
	"customer/dashboard/frelanser/request_add",
	"customer/dashboard/frelanser/request_list",
	"customer/dashboard/frelanser/user_detail",
	"customer/dashboard/frelanser",
	"customer/dashboard",
	"auth/forgot-password",
	"auth/lock-screen",
	"auth/login",
	"auth/recover-password",
	"auth/register",
	"error/500",
	"error/404",
	"home",
	"users_list",
	"user_detail",
	"projects_list",
	"project_detail",
];
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
				"ejs",
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
				test: /\.(jpg|jpeg|png|svg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[md5:hash:hex].[ext]",
							publicPath: "/img",
							outputPath: path.resolve("../", "src", "public", "img"),
						},
					},
				],
			},
		],
	},

	resolve: {
		extensions: [".js", ".jsx", ".json", "*"],
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
		//new CleanWebpackPlugin(),
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
