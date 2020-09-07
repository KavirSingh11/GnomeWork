const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
	projectID: {
		type: String,
		unique: true,
	},
	ownerID: {
		type: String,
	},
	projectMembers: [
		{
			userID: { type: String },
			userEmail: { type: String },
			userName: { type: String },
			points: { type: Number, min: 0 },
		},
	],
	projectName: {
		type: String,
	},
});

const Project = mongoose.model("project", ProjectSchema);

exports.Project = Project;
