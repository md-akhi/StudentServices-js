import mongoose from "mongoose";

var todoSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		index: true,
		ref: "User",
	},
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	status: {
		type: Boolean,
		default: true,
	},
	order: {
		type: Number,
	},
});

let MTodo = mongoose.model("todo", todoSchema);
export default MTodo;
//user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
