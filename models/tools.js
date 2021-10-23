import mongoose from "mongoose";
import { User as ModelUser } from "./user.js";

var todoSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		index: true,
		ref: ModelUser,
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

let Todo = mongoose.model("todo", todoSchema);

var chatSchema = mongoose.Schema(
	{
		fromId: {
			type: mongoose.Schema.Types.ObjectId,
			index: true,
			ref: ModelUser,
		},
		toId: {
			type: mongoose.Schema.Types.ObjectId,
			index: true,
			ref: ModelUser,
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

let Chat = mongoose.model("chat", chatSchema);

var calendarSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		index: true,
		ref: ModelUser,
	},
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	status: {
		type: Number,
	},
	timeStart: {
		type: Date,
	},
	timeEnd: {
		type: Date,
	},
	color: {
		type: String,
	},
});

let Calendar = mongoose.model("calendar", calendarSchema);

export { Chat, Todo, Calendar };
