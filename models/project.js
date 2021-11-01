import mongoose from "mongoose";
import { User as ModelUser } from "./user.js";

var projectSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.ObjectId,
			ref: ModelUser,
		},
		frelancerId: {
			type: mongoose.ObjectId,
			ref: ModelUser,
		},
		status: {
			type: Number,
		},
		name: {
			type: String,
		},
		description: {
			type: String,
		},
		progress: {
			type: Number,
		},
		budget: {
			type: Number,
		},
		startTimeAt: {
			type: Date,
		},
		duration: {
			type: Number,
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

projectSchema.static("getAll", function (arg, callback) {
	this.find(arg, callback);
});
const Project = mongoose.model("project", projectSchema);

var requestSchema = mongoose.Schema({
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
	invoice: [
		{
			order: {
				type: String,
			},
			description: {
				type: String,
			},
			amount: {
				type: Number,
			},
		},
	],
	duration: {
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
const Request = mongoose.model("request", requestSchema);

var paymentSchema = mongoose.Schema({
	userId: {
		type: mongoose.ObjectId,
		ref: ModelUser,
	},
	status: {
		type: Number,
	},
});
let Payment = mongoose.model("payment", paymentSchema);

var invoiceSchema = mongoose.Schema({
	employerId: {
		type: mongoose.ObjectId,
		ref: ModelUser,
	},
	frelancerId: {
		type: mongoose.ObjectId,
		ref: ModelUser,
	},
	requestId: {
		type: mongoose.ObjectId,
		ref: Request,
	},
	projectId: {
		type: mongoose.ObjectId,
		ref: Project,
	},
	paymentId: [
		{
			type: mongoose.ObjectId,
			ref: Payment,
		},
	],
	employerStatus: {
		type: Number,
	},
	frelancerStatus: {
		type: Number,
	},
});
let Invoice = mongoose.model("invoice", invoiceSchema);

var fileSchema = mongoose.Schema({
	userId: {
		type: mongoose.ObjectId,
		ref: ModelUser,
	},
	projectId: {
		type: mongoose.ObjectId,
		ref: Project,
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

var bugSchema = mongoose.Schema({
	userId: {
		type: mongoose.ObjectId,
		ref: ModelUser,
	},
	projectId: {
		type: mongoose.ObjectId,
		ref: Project,
	},
	fileId: {
		type: mongoose.ObjectId,
		ref: File,
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
	color: {
		type: String,
	},
	status: {
		type: Number,
	},
	StartTimeAt: {
		type: Date,
	},
	EndTimeAt: {
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

export { Bug, Task, Note, TimeSheet, Payment, File, Project, Request, Invoice };
