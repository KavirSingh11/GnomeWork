const { Project } = require("../models/project");
const { User } = require("../models/user");
const { v4: uuidv4 } = require("uuid");

const postProject = async (req, res, next) => {
	const name = req.body.projectName;
	const ownerID = req.body.ownerID;
	let project = await Project.findOne({ projectName: name, ownerID: ownerID });
	try {
		if (project) {
			res.status(400).send("Project names must be unique");
		} else {
			project = new Project({
				projectID: uuidv4(),
				ownerID: ownerID,
				projectMembers: req.body.projectMembers,
				projectName: name,
				completion: 0,
			});
			await project.save();
			res.status(200).send(project);
		}
	} catch (e) {
		res.status(500).send(`Error: ${e.message}`);
	}
};

const getProjects = async (req, res, next) => {
	const userID = req.params.userID;
	if (req.params.type === "owner") {
		const projects = await Project.find({ ownerID: userID });
		try {
			res.status(200).send(projects);
		} catch (e) {
			res.status(500).send(`Error: ${e.message}`);
		}
	} else if (req.params.type === "worker") {
		const projects = await Project.find({ "projectMembers.userID": userID });
		try {
			res.status(200).send(projects);
		} catch (e) {
			res.status(500).send(`Error: ${e.message}`);
		}
	}
};

//Verify each user upon trying to add them to a team or project
const verifyUser = async (req, res, next) => {
	var user = {};
	if (req.params.user.includes("@")) {
		const email = req.params.user;
		try {
			user = await User.findOne({ email });
		} catch (e) {
			res.status(500).send(e);
		}
	} else {
		const id = req.params.user;
		try {
			user = await User.findOne({ _id: id });
		} catch (e) {
			res.status(500).send(e);
		}
	}

	try {
		if (user) {
			res.status(200).send({
				userID: user._id,
				userEmail: user.email,
				userName: user.name,
				points: 0,
			});
		} else {
			res.send("User not found");
		}
	} catch (e) {
		res.status(500).send(`Error: ${e.message}`);
	}
};

const editProject = (req, res, next) => {
	const projectID = req.params.projectID;
	const newInfo = req.body;

	Project.findOneAndUpdate({ projectID: projectID }, newInfo)
		.then((result) => res.json(result))
		.catch((err) => res.status(500).json(`Error: ${err.message}`));
};

const deleteProject = async (req, res, next) => {
	const projectID = req.params.projectID;

	try {
		await Project.findOneAndRemove({ projectID: projectID }, (err, _) => {
			if (err) {
				res.status(400).send(`Error: ${err}`);
			} else {
				res.status(200).send(`Project "${projectID}" removed`);
			}
		});
	} catch (e) {
		res.status(500).send(`Error: ${e.message}`);
	}
};

module.exports = {
	postProject,
	getProjects,
	editProject,
	deleteProject,
	verifyUser,
};
