import React from "react";
import { connect } from "react-redux";

import Tile from "../../TaskTile";
import { getTasks } from "../../../actions/taskActions";
import "../../../css/projectpage.css";
class ProjectPage extends React.Component {
	async componentDidMount() {
		await this.getTasks();
	}
	async getTasks() {
		await this.props.getTasks();
		console.log("tasks fetched");
	}

	renderTiles() {
		console.log("tiles rendered");
		return this.props.tasks.map((task) => {
			return <Tile key={task._id} task={task} />;
		});
	}

	render() {
		return (
			<div className="project-page">
				<h1 className="project-title">{this.props.project.projectName}</h1>
				<div className="tile-board">{this.renderTiles()}</div>
				<div className="leaderboard">leaderboard</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		project: state.projects.viewProject,
		tasks: state.tasks.tasks,
	};
};

export default connect(mapStateToProps, { getTasks })(ProjectPage);
