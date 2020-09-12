import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import "../css/taskTile.css";
class TaskTile extends React.Component {
	state = {
		name: "",
	};

	async componentDidMount() {
		await this.getAssignment(this.props.task.assignedTo);
	}

	async getAssignment(id) {
		var name = "";
		if (id === "Unassigned") {
			name = id;
		} else {
			const res = await axios.get(`http://localhost:5000/verify/${id}`);
			name = res.data.name;
		}
		this.setState({ name: name }, () => {
			console.log(this.state.name);
		});
	}

	render() {
		const task = this.props.task;
		return (
			<div className="task-tile">
				<h1 className="title">{task.taskName}</h1>
				<div className="assignedTo">{this.state.name}</div>
				<div className="pointVal">{task.pointVal} Points</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authToken: state.auth.authToken,
	};
};

export default connect(mapStateToProps, {})(TaskTile);
