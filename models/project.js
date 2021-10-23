import mongoose from "mongoose";
import { User as ModelUser } from "./user.js";

var projectSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.ObjectId,
			ref: ModelUser,
		},
		name: {
			type: String,
		},
		description: {
			type: String,
		},
		Status: {
			type: Number,
		},
		estimatedBudget: {
			type: Number,
		},
		estimatedDuration: {
			type: Number,
		},
		payId: {
			type: String,
			ref: "Pay",
		},
		request: {
			type: Date,
		},
		Progress: {
			type: Number,
		},
		date: {
			type: Date,
		},
		updatedAt: {
			type: Date,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);

projectSchema.static("getAllProject", function (arg, callback) {
	this.find(arg, callback);
});
let Project = mongoose.model("project", projectSchema);

var bugSchema = mongoose.Schema({
	userId: {
		type: mongoose.ObjectId,
		ref: ModelUser,
	},
	projectId: {
		type: mongoose.ObjectId,
		ref: Project,
	},
	projectFileId: {
		type: String,
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
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
let Bug = mongoose.model("bug", bugSchema);

var taskSchema = mongoose.Schema({
	userId: {
		type: mongoose.ObjectId,
		ref: ModelUser,
	},
	projectId: {
		type: mongoose.ObjectId,
		ref: Project,
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
	updatedAt: {
		type: Date,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
let Task = mongoose.model("task", taskSchema);

var noteSchema = mongoose.Schema({
	userId: {
		type: mongoose.ObjectId,
		ref: ModelUser,
	},
	projectId: {
		type: mongoose.ObjectId,
		ref: Project,
	},
	note: {
		type: String,
	},
});
let Note = mongoose.model("note", noteSchema);

var timeSheetSchema = mongoose.Schema({
	userId: {
		type: mongoose.ObjectId,
		ref: ModelUser,
	},
});
let TimeSheet = mongoose.model("timesheet", timeSheetSchema);

var paymentSchema = mongoose.Schema({
	userId: {
		type: mongoose.ObjectId,
		ref: ModelUser,
	},
});
let Payment = mongoose.model("payment", paymentSchema);

var fileSchema = mongoose.Schema({
	userId: {
		type: mongoose.ObjectId,
		ref: ModelUser,
	},
	projectId: {
		type: mongoose.ObjectId,
		ref: Project,
	},
	FileId: {
		type: Number,
	},
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	type: {
		type: String,
	},
	size: {
		type: Number,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
let File = mongoose.model("file", fileSchema);

var messageSchema = mongoose.Schema({
	userId: {
		type: mongoose.ObjectId,
		ref: ModelUser,
	},
	projectId: {
		type: mongoose.ObjectId,
		ref: Project,
	},
	description: {
		type: String,
	},
	amount: {
		type: Number,
	},
	estimatedDuration: {
		type: Number,
	},
	status: {
		type: Number,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
let Message = mongoose.model("message", messageSchema);

export { Project, Bug, Task, Note, TimeSheet, Payment, File, Message };
