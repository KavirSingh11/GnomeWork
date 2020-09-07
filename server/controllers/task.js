const { Task } = require("../models/task");

const getTasks = async (req, res, next) => {
	const projectID = req.params.projectID;
	const tasks = await Task.find({ projectID });
	try {
		res.status(200).send(tasks);
	} catch (e) {
		res.status(500).send(`Error: ${e.message}`);
	}
};

const postTask = async (req, res, next) => {
	try {
		const task = new Task({
			projectID: req.body.projectID,
			taskName: req.body.taskName,
			isComplete: false,
			isFlagged: false,
			assignedTo: req.body.assignedTo,
			pointVal: req.body.pointVal,
			comments: [],
			flagComments: [],
		});
		await task.save();
		res.status(200).send(`${req.body.taskName} saved`);
	} catch (e) {
		res.status(500).send(`Error: ${e.message}`);
	}
};

module.exports = {
	postTask,
	getTasks,
};
