import Mongoose from "mongoose";
import { User as UserModel } from "./user.js";

var ProjectSchema = Mongoose.Schema(
	{
		userId: {
			type: Mongoose.ObjectId,
			ref: UserModel,
		},
		frelancerId: {
			type: Mongoose.ObjectId,
			ref: UserModel,
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

ProjectSchema.static("getAll", function (arg, callback) {
	this.find(arg, callback);
});
const Project = Mongoose.model("project", ProjectSchema);

var RequestSchema = Mongoose.Schema({
	userId: {
		type: Mongoose.ObjectId,
		ref: UserModel,
	},
	projectId: {
		type: Mongoose.ObjectId,
		ref: Project,
	},
	description: {
		type: String,
	},
	invoice: [
		{
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
const Request = Mongoose.model("request", RequestSchema);

var PaymentSchema = Mongoose.Schema({
	userId: {
		type: Mongoose.ObjectId,
		ref: UserModel,
	},
	requestId: {
		type: Mongoose.ObjectId,
		ref: Request,
	},
	status: {
		type: Number,
	},
	amount: {
		type: String,
	},
	desc: {
		type: String,
	},
});
let Payment = Mongoose.model("payment", PaymentSchema);

var InvoiceSchema = Mongoose.Schema({
	employerId: {
		type: Mongoose.ObjectId,
		ref: UserModel,
	},
	frelancerId: {
		type: Mongoose.ObjectId,
		ref: UserModel,
	},
	requestId: {
		type: Mongoose.ObjectId,
		ref: Request,
	},
	projectId: {
		type: Mongoose.ObjectId,
		ref: Project,
	},
	paymentId: [
		{
			type: Mongoose.ObjectId,
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
let Invoice = Mongoose.model("invoice", InvoiceSchema);

var FileSchema = Mongoose.Schema({
	projectId: {
		type: Mongoose.ObjectId,
		ref: Project,
	},
	files: [
		{
			userId: {
				type: Mongoose.ObjectId,
				ref: UserModel,
			},
			base: {
				type: String,
			},
			name: {
				type: String,
			},
			mimetype: {
				type: String,
			},
			md5: {
				type: String,
			},
			createdAt: {
				type: Date,
				default: Date.now,
			},
		},
	],
});
let File = Mongoose.model("file", FileSchema);

var BugSchema = Mongoose.Schema({
	userId: {
		type: Mongoose.ObjectId,
		ref: UserModel,
	},
	projectId: {
		type: Mongoose.ObjectId,
		ref: Project,
	},
	fileId: {
		type: Mongoose.ObjectId,
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
let Bug = Mongoose.model("bug", BugSchema);

var TaskSchema = Mongoose.Schema({
	userId: {
		type: Mongoose.ObjectId,
		ref: UserModel,
	},
	projectId: {
		type: Mongoose.ObjectId,
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
let Task = Mongoose.model("task", TaskSchema);

var NoteSchema = Mongoose.Schema({
	userId: {
		type: Mongoose.ObjectId,
		ref: UserModel,
	},
	projectId: {
		type: Mongoose.ObjectId,
		ref: Project,
	},
	note: {
		type: String,
	},
});
let Note = Mongoose.model("note", NoteSchema);

var TimeSheetSchema = Mongoose.Schema({
	userId: {
		type: Mongoose.ObjectId,
		ref: UserModel,
	},
});
let TimeSheet = Mongoose.model("timesheet", TimeSheetSchema);

export { Bug, Task, Note, TimeSheet, Payment, File, Project, Request, Invoice };
