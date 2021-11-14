import Mongoose from "mongoose";

export default function (env) {
	//mongoDB
	Mongoose.Promise = global.Promise;
	Mongoose.connect(env.MONGODB_URL + env.DB_NAME, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	}).catch((err) => {
		console.error("Connection error", err.message);
	});
	Mongoose.connection;
	return Mongoose;
}
