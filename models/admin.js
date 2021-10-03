import mongoose from "mongoose";

var adminSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
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

let MAdmin = mongoose.model("admin", adminSchema);
export default MAdmin;
//user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
