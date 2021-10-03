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
});

let MConfig = mongoose.model("config", configSchema);
export default MConfig;
//user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
