import React from "react";
import { connect } from "react-redux";

import "../css/taskTile.css";
class TaskTile extends React.Component {
	render() {
		const task = this.props.task;
		return (
			<div className="task-tile">
				<h1 className="title">{task.taskName}</h1>
				<div className="assignedTo">{task.assignedTo.userName}</div>
				<div className="pointVal">{task.pointVal} Points</div>
			</div>
		);
	}
}

export default TaskTile;
