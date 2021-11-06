import Mongoose from "mongoose";
import { User as UserModel } from "./user.js";

var TodoSchema = Mongoose.Schema({
	userId: {
		type: Mongoose.ObjectId,
		index: true,
		ref: UserModel,
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

let Todo = Mongoose.model("todo", TodoSchema);

var ChatSchema = Mongoose.Schema(
	{
		fromId: {
			type: Mongoose.ObjectId,
			index: true,
			ref: UserModel,
		},
		toId: {
			type: Mongoose.ObjectId,
			index: true,
			ref: UserModel,
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

let Chat = Mongoose.model("chat", ChatSchema);

var CalendarSchema = Mongoose.Schema({
	userId: {
		type: Mongoose.ObjectId,
		index: true,
		ref: UserModel,
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

let Calendar = Mongoose.model("calendar", CalendarSchema);

export { Chat, Todo, Calendar };
