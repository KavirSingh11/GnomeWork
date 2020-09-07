const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({});

const Task = mongoose.model("task", TaskSchema);

exports.Task = Task;
