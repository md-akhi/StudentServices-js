import mongoose from "mongoose";

var chatSchema = mongoose.Schema(
	{
		fromId: {
			type: mongoose.Schema.Types.ObjectId,
			index: true,
			ref: "User",
		},
		toId: {
			type: mongoose.Schema.Types.ObjectId,
			index: true,
			ref: "User",
		},
		from: [
			{
				message: {
					type: String,
				},
				seen: {
					type: Boolean,
					default: false,
				},
				timestamp: {
					type: Date,
					default: Date.now,
				},
			},
		],
		to: [
			{
				message: {
					type: String,
				},
				seen: {
					type: Boolean,
					default: false,
				},
				timestamp: {
					type: Date,
					default: Date.now,
				},
			},
		],
		updatedAt: Date,
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

let MChat = mongoose.model("chat", chatSchema);
export default MChat;
//user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
