import mongoose from "mongoose";

export default function (env) {
	//mongoDB
	const dbUrl =
		env.MONGODB_URL + env.DB_NAME ||
		"mongodb://127.0.0.1:27017/studentServices";
	mongoose.Promise = global.Promise;
	mongoose
		.connect(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.catch((e) => {
			console.error("Connection error", e.message);
		});
	mongoose.connection;
	return mongoose;
}
