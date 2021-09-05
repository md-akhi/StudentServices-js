var mongoose = require("mongoose");

const { MUser } = require("./user");

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

module.exports = mongoose.model("project", projectSchema);

//user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
