const presets = {
	presets: [
		"@babel/preset-react",
		[
			"@babel/preset-env",
			{
				targets: {
					node: "current",
				},
			},
		],
	],
};
const plugins = { plugins: [["@babel/plugin-proposal-class-properties"]] };

if (process.env.NODE_ENV === "development") {
	plugins.plugins.push(
		[
			"file-loader",
			{
				name: "[hash].[ext]",
				extensions: ["png", "jpg", "jpeg", "gif", "svg"],
				publicPath: "/public/img",
				outputPath: null,
			},
			"img-file-loader-plugin",
		],
		[
			"file-loader",
			{
				name: "[hash].[ext]",
				extensions: ["css", "sass", "scss"],
				publicPath: "/public/css",
				outputPath: null,
			},
			"css-file-loader-plugin",
		]
	);
}

const addConfigs = { ignore: ["./src/public/"] };

export default { ...plugins, ...presets, ...addConfigs };
