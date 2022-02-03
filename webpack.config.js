const { merge } = require("webpack-merge");

const commonWebpack = require("./build/webpack/webpack.common.js");
const devWebpack = require("./build/webpack/webpack.dev.js");
const prodWebpack = require("./build/webpack/webpack.prod.js");

module.exports = () => {
	let envConfig;
	switch (process.env.NODE_ENV) {
		case "prod":
		case "production":
			envConfig = prodWebpack;
			break;
		case "dev":
		case "development":
		default:
			envConfig = devWebpack;
			//throw new Error('No matching configuration was found!');
			break;
	}
	return merge(commonWebpack, envConfig);
};
