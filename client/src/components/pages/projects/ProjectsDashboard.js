import React from "react";
import { connect } from "react-redux";

import Tile from "../../PageTile";
import { getUser } from "../../../actions/authActions";
import {
	getProjects,
	postProject,
	setView,
} from "../../../actions/projectActions";
import requireSignin from "../../requireSignin";

class ProjectsDashboard extends React.Component {
	state = {};

	async componentDidMount() {
		if (this.props.auth.authToken && !this.props.auth.userID) {
			await this.getUserInfo();
		}
		await this.getProjects();
	}

	async getProjects() {
		const userData = {
			userID: this.props.auth.userID,
			type: this.props.auth.type,
		};
		await this.props.getProjects(userData);
	}
	async getUserInfo() {
		await this.props.getUser(this.props.authToken);
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
					type="project"
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
		return <div className="tileboard">{this.renderTiles()}</div>;
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
