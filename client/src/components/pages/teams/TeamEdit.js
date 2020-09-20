import React from "react";

import { editTeam, deleteTeam } from "../../../actions/teamActions";
import { connect } from "react-redux";
class TeamEdit extends React.Component {
	render() {
		return (
			<div>
				<div>{this.props.viewTeam.teamName}</div>
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

export default connect(mapStateToProps, { editTeam, deleteTeam })(TeamEdit);
