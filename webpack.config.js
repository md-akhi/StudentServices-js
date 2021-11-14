import { merge as MergeWebpack } from "webpack-merge";

import commonWebpack from "./build/webpack/webpack.common.cjs";
import devWebpack from "./build/webpack/webpack.dev.cjs";
import prodWebpack from "./build/webpack/webpack.prod.cjs";

export default (env) => {
	let envConfig;
	switch (env.NODE_ENV) {
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
	return MergeWebpack(commonWebpack, envConfig);
};
