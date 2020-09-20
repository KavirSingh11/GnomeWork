import React from "react";
import { connect } from "react-redux";

import { getTasks } from "../../../actions/taskActions";
import Tile from "../../TaskTile";
import "../../../css/projectpage.css";
class ProjectPage extends React.Component {
	async componentDidMount() {
		if (!this.props.project.projectName) {
			this.props.history.push("/");
		}
		await this.getTasks();
	}
	async getTasks() {
		await this.props.getTasks();
	}
	createProject() {
		this.props.history.push("/projects/create");
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
				<div className="header">
					<h1 className="title">{this.props.project.projectName}</h1>
					<button
						className="edit-button"
						onClick={() => this.props.history.push("/projects/edit")}
					>
						<i className="far fa-edit"> </i>
					</button>
				</div>
				<div className="main-content">
					<div className="task-board">{this.renderTiles()}</div>
				</div>
				<div className="side-content">leaderboard</div>
				{this.props.auth.type === 1 ? (
					<div onClick={() => this.createProject()} className="add-project">
						+
					</div>
				) : null}
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
