import React from "react";
import { connect } from "react-redux";

import ProjectTile from "../../ProjectTile";
import { getUser } from "../../../actions/authActions";
import { getTeams, postTeam, setViewTeam } from "../../../actions/teamActions";
class TeamsDashboard extends React.Component {
	async componentDidMount() {
		if (this.props.auth.authToken && !this.props.auth.userID) {
			await this.getUserInfo();
		}
		await this.getTeams();
	}
	async getUserInfo() {
		await this.props.getUser(this.props.auth.authToken);
	}
	async getTeams() {
		await this.props.getTeams();
	}

	handleTileClick(team) {
		this.props.setViewTeam(team);
		this.props.history.push("/teams/view");
	}

	createTeam() {
		this.props.history.push("/teams/create");
	}

	renderTeams() {
		return this.props.teams.map((team) => {
			return (
				<ProjectTile
					key={team._id}
					name={team.teamName}
					members={team.teamMembers}
					handleClick={() => this.handleTileClick(team)}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<div className="tileboard">{this.renderTeams()}</div>
				{this.props.auth.type === 1 ? (
					<div onClick={() => this.createTeam()} className="add-project">
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
		teams: state.teams.teams,
	};
};

export default connect(mapStateToProps, {
	getTeams,
	postTeam,
	getUser,
	setViewTeam,
})(TeamsDashboard);
