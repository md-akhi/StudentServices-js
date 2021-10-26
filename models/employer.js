import mongoose from "mongoose";
// import { User as ModelUser } from "./user.js";
// import { Request as ModelRequest } from "./frelanser.js";

var employerSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		index: true,
	},
	bookmark: [
		{
			title: { type: String },
			projectId: { type: Number },
		},
	],
	chat_status: {
		type: String,
		default: "offline",
	},
	role: {
		type: [{ type: String }],
		default: ["ROLE_CHAT", "ROLE_PROJECT", "ROLE_REQUEST"],
		enum: ["ROLE_CHAT", "ROLE_PROJECT", "ROLE_REQUEST"],
	},
	updated: Date,
	created: {
		type: Date,
		default: Date.now,
	},
});

let Employer = mongoose.model("employer", employerSchema);

export default Employer;
