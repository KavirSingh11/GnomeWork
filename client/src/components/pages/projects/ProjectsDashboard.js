import React from "react";
import { connect } from "react-redux";

import Tile from "../../ProjectTile";
import { getUser } from "../../../actions/authActions";
import {
	getProjects,
	postProject,
	setView,
} from "../../../actions/projectActions";
import requireSignin from "../../requireSignin";
import "../../../css/projectdash.css";

class ProjectsDashboard extends React.Component {
	state = {};

	async componentDidMount() {
		if (this.props.auth.authToken && !this.props.auth.userID) {
			await this.getUserInfo();
		}
		await this.getProjects();
	}

	async getProjects() {
		await this.props.getProjects();
	}
	async getUserInfo() {
		await this.props.getUser(this.props.authToken);
	}

	createProject() {
		this.props.history.push("/projects/create");
	}

	handleTileClick(project) {
		this.props.setView(project);
		this.props.history.push("/projects/view");
	}
	renderTiles() {
		return this.props.projects.map((project) => {
			return (
				<Tile
					key={project.projectID}
					name={project.projectName}
					id={project.projectID}
					members={project.projectMembers}
					completion={project.completion}
					handleClick={() => this.handleTileClick(project)}
				/>
			);
		});
	}

	render() {
		return (
			<div className="dashboard">
				<div className="tileboard">{this.renderTiles()}</div>
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
		projects: state.projects.projects,
		projectsError: state.projects.errorMessage,
	};
};

export default connect(mapStateToProps, {
	getProjects,
	postProject,
	setView,
	getUser,
})(requireSignin(ProjectsDashboard));
