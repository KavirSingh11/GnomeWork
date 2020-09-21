import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { postTeam } from "../../../actions/teamActions";
import "../../../css/createTeam.css";
import requireSignin from "../../requireSignin";

class TeamCreate extends React.Component {
	state = {
		teamName: "",
		teamMembers: [],
		newEmail: "",
	};
	handleKeyPress(e) {
		if (e.key === "Enter") {
			this.addMember();
		}
	}
	async addMember() {
		const config = {
			headers: {
				"auth-token": this.props.auth.authToken,
			},
		};
		try {
			const res = await axios.get(
				`http://localhost:5000/verify/${this.state.newEmail}`,
				config
			);
			const member = {
				userID: res.data.userID,
				userEmail: res.data.userEmail,
				userName: res.data.userName,
				lifeTimePoints: 0,
			};
			if (res.data.userID) {
				this.setState({ teamMembers: [...this.state.teamMembers, member] });
			} else {
				alert("user not found");
			}
		} catch (e) {
			alert(`Error: ${e.message}`);
		}
		this.setState({ newEmail: "" });
	}
	removeMember(member) {
		const newMembers = [...this.state.teamMembers];
		const index = newMembers.indexOf(member);
		if (index !== -1) {
			newMembers.splice(index, 1);
			this.setState({ teamMembers: newMembers });
		}
	}
	async createTeam() {
		const team = {
			teamName: this.state.teamName,
			ownerID: this.props.auth.userID,
			teamMembers: this.state.teamMembers,
		};
		await this.props.postTeam(team);
		this.props.history.push("/teams/dashboard");
	}

	renderMemberList() {
		return this.state.teamMembers.map((member) => {
			return (
				<div className="member" key={member.userID}>
					<div className="member-name">{member.userName}</div>
					<button onClick={() => this.removeMember(member)}>
						<i className="remove-member fas fa-minus"></i>
					</button>
				</div>
			);
		});
	}

	render() {
		return (
			<div className="team-create-page">
				<div className="header">
					<input
						className="team-name"
						type="text"
						defaultValue="Team name"
						onChange={(e) => this.setState({ teamName: e.target.value })}
					/>
				</div>
				<div className="create-team">
					<h1 className="content-header">Add Members to Team</h1>
					<div className="add-email">
						<input
							type="email"
							placeholder="Email"
							className="input-email"
							onChange={(e) => this.setState({ newEmail: e.target.value })}
							value={this.state.newEmail}
							onKeyPress={(e) => this.handleKeyPress(e)}
						/>
						<div className="add-member" onClick={() => this.addMember()}>
							+
						</div>
					</div>
				</div>

				<div className="current-members">
					<h2>Members</h2>
					{this.renderMemberList()}
				</div>
				<button className="submit-team" onClick={() => this.createTeam()}>
					Create
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { postTeam })(
	requireSignin(TeamCreate)
);
