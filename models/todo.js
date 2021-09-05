var mongoose = require("mongoose");

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

module.exports = mongoose.model("todo", todoSchema);

//user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
