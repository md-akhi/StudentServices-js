import mongoose from "mongoose";

import { MUser } from "./user.js";

var projectSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.ObjectId,
			ref: MUser,
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
let MProject = mongoose.model("project", projectSchema);

export default MProject;

//user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
