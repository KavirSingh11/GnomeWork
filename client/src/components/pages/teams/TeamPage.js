//view/edit team here
//team creation done through a modal
import React from "react";

import { connect } from "react-redux";
import "../../../css/projectpage.css";

class TeamPage extends React.Component {
	componentDidMount() {
		if (!this.props.viewTeam.teamMembers) {
			this.props.history.push("/");
		}
	}
	createTeam() {
		this.props.history.push("/teams/create");
	}

	removeMember(userID) {
		console.log(userID);
	}

	renderTeam() {
		if (this.props.viewTeam.teamMembers) {
			return this.props.viewTeam.teamMembers.map((member) => {
				return (
					<div key={member._id} className="member-container">
						<h1>{member.userName}</h1>
						<div
							className="remove-member"
							onClick={() => this.removeMember(member.userID)}
						>
							REMOVE
						</div>
					</div>
				);
			});
		}
	}
	render() {
		return (
			<div className="detail-page">
				<h1 className="header">{this.props.viewTeam.teamName}</h1>
				<div className="main-content">{this.renderTeam()}</div>
				<div className="side-content">leaderboard</div>
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
		viewTeam: state.teams.viewTeam,
	};
};

export default connect(mapStateToProps, {})(TeamPage);
