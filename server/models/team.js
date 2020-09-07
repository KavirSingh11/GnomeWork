const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
	teamName: { type: String, maxlength: 50 },
	ownerID: { type: String },
	teamMembers: [
		{
			userID: { type: String },
			userEmail: { type: String },
			userName: { type: String },
			lifeTimePoints: { type: Number, min: 0 },
		},
	],
});

const Team = mongoose.model("team", TeamSchema);

exports.Team = Team;
