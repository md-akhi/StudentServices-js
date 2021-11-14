import Mongoose from "mongoose";
// import { User as UserModel } from "./user.js";
// import { Request as RequestModel } from "./frelanser.js";

var EmployerSchema = Mongoose.Schema({
	userId: {
		type: Mongoose.ObjectId,
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

let Employer = Mongoose.model("employer", EmployerSchema);

export default Employer;
