import Mongoose from "mongoose";

var AdminSchema = Mongoose.Schema({
	userId: {
		type: Mongoose.ObjectId,
		index: true,
	},
	chatStatus: {
		type: String,
		default: "offline",
	},
	ownerStatus: {
		type: Number,
		default: 0, //"1 owner, 0 not owner"
	},
	role: {
		type: [{ type: String }],
		default: ["ROLE_MEMBER", "ROLE_MEMBER", "ROLE_REQUEST"],
		enum: ["ROLE_CHAT", "ROLE_PROJECT", "ROLE_REQUEST"],
	},
	updatedAt: Date,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

let Admin = Mongoose.model("admin", AdminSchema);
export default Admin;
//user: { type: Mongoose.ObjectId, ref: 'User' },
