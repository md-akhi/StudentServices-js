var mongoose = require("mongoose");

var chatSchema = mongoose.Schema(
	{
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
	}
);

module.exports = mongoose.model("chat", chatSchema);

//user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
