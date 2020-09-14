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
			<div className="detail-page">
				<h1 className="header">{this.props.project.projectName}</h1>
				<div className="main-content">{this.renderTiles()}</div>
				<div className="side-content">leaderboard</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		project: state.projects.viewProject,
		tasks: state.tasks.tasks,
	};
};

export default connect(mapStateToProps, { getTasks })(ProjectPage);
