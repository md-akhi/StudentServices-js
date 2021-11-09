import { merge as MergeWebpack } from "webpack-merge";

import commonWebpack from "./build/webpack/webpack.common.cjs";
import productionWebpack from "./build/webpack/webpack.prod.cjs";
import developmentWebpack from "./build/webpack/webpack.dev.cjs";

export default (env, args) => {
	let envConfig;
	switch (args.mode || env.NODE_ENV) {
		case "prod":
		case "production":
			envConfig = productionWebpack;
			break;

		case "dev":
		case "development":
		default:
			envConfig = developmentWebpack;
		//throw new Error('No matching configuration was found!');
	}
	return MergeWebpack(commonWebpack, envConfig);
};
