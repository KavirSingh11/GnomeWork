const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	projectID: {
		type: String,
	},
	taskName: {
		type: String,
		maxlength: 50,
	},
	isComplete: {
		type: Boolean,
	},
	isFlagged: {
		type: Boolean,
	},
	assignedTo: {
		userID: { type: String, default: "Unassigned" },
		userName: {
			type: String,
		},
	},
	pointVal: {
		type: Number,
		min: 0,
	},
	comments: [
		{
			comment: {
				type: String,
				maxlength: 250,
			},
			writtenBy: {
				type: String,
			},
		},
	],
	flagComments: [
		{
			comment: {
				type: String,
				maxlength: 250,
			},
			writtenBy: {
				type: String,
			},
		},
	],
});

const Task = mongoose.model("task", TaskSchema);

exports.Task = Task;
