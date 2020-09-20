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
		res.status(200).send(task);
	} catch (e) {
		res.status(500).send(`Error: ${e.message}`);
	}
};

const editTask = (req, res, next) => {
	const taskName = req.body.oldTaskName;
	const projectID = req.params.projectID;
	const newInfo = req.body.newInfo;

	Task.findOneAndUpdate({ projectID: projectID, taskName: taskName }, newInfo)
		.then((result) => res.json(result))
		.catch((err) => res.status(500).json(`Error: ${err.message}`));
};

const deleteTask = async (req, res, next) => {
	const taskName = req.params.taskName;
	const projectID = req.params.projectID;

	try {
		await Task.findOneAndRemove(
			{ projectID: projectID, taskName: taskName },
			(err, _) => {
				if (err) {
					res.status(400).send(`Error: ${err}`);
				} else {
					res.status(200).send(`${taskName} removed`);
				}
			}
		);
	} catch (e) {
		res.status(500).send(`Error: ${e.message}`);
	}
};

const projectDeleted = async (req, res, next) => {
	const projectID = req.params.projectID;
	try {
		await Task.deleteMany({ projectID: projectID }, (err, _) => {
			if (err) {
				res.status(400).send(`Error: ${err}`);
			} else {
				res
					.status(200)
					.send(`Tasks associated with project ${projectID} removed`);
			}
		});
	} catch (e) {
		res.status(500).send(`Error: ${e.message}`);
	}
};

module.exports = {
	postTask,
	getTasks,
	editTask,
	projectDeleted,
	deleteTask,
};
