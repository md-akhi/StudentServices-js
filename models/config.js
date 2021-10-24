import mongoose from "mongoose";

var configSchema = mongoose.Schema({
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

let MConfig = mongoose.model("config", configSchema);
export default MConfig;
//user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
