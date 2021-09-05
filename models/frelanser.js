var mongoose = require("mongoose");

var frelanserSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		index: true,
	},
	calendarEvent: [
		{
			title: { type: String },
			description: { type: String },
			startTimestamp: { type: Number },
			endTimestamp: { type: Number },
			color: { type: String },
		},
	],
	currency: [
		{
			name: { type: String, default: "ریال" },
			code: { type: Number, default: "IRR" },
			symbol: { type: String, default: "﷼" },
		},
	],
	bookMark: [
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

module.exports = mongoose.model("frelanser", frelanserSchema);

//user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
