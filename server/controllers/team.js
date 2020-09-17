const { Team } = require("../models/team");

const getTeams = async (req, res, next) => {
	const userID = req.params.userID;
	if (req.params.type === "owner") {
		const teams = await Team.find({ ownerID: userID });
		try {
			res.status(200).send(teams);
		} catch (e) {
			res.status(500).send(`Error: ${e.message}`);
		}
	} else if (req.params.type === "worker") {
		const teams = await Team.find({ "teamMembers.userID": userID });
		try {
			res.status(200).send(teams);
		} catch (e) {
			res.status(500).send(`Error: ${e.message}`);
		}
	}
};

const postTeam = async (req, res, next) => {
	const teamName = req.body.teamName;
	const ownerID = req.body.ownerID;
	let team = await Team.findOne({ teamName, ownerID });
	try {
		if (team) {
			res.status(400).send("Team names must be unique");
		} else {
			team = new Team({
				teamName: teamName,
				ownerID: ownerID,
				teamMembers: req.body.teamMembers,
			});
			await team.save();
			res.status(200).send(team);
		}
	} catch (e) {
		res.status(500).send(`Error: ${e.message}`);
	}
};

const editTeam = async (req, res, next) => {};

const deleteTeam = async (req, res, next) => {};

module.exports = {
	getTeams,
	postTeam,
	editTeam,
	deleteTeam,
};
