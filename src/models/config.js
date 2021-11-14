import Mongoose from "mongoose";

var ConfigSchema = Mongoose.Schema({
	emailTemplate: [
		{
			task: {
				type: String,
			},
			subject: {
				type: String,
			},
			body: {
				type: String,
			},
			instruction: {
				type: String,
			},
		},
	],
	fileUpload: {
		path: {
			type: String,
		},
		allowed_types: [
			{
				type: String,
			},
		],
	},
	system: {
		name: {
			type: String,
		},
		title: {
			type: String,
		},
		address: {
			type: String,
		},
		email: {
			type: String,
		},
		language: {
			type: String,
		},
		textAlign: {
			type: String,
		},
		paypalType: {
			type: String,
		},
		theme: {
			type: String,
		},
	},
});

let Config = Mongoose.model("config", ConfigSchema);
export default Config;
//user: { type: Mongoose.ObjectId, ref: 'User' },
