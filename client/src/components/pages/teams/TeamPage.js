//view/edit team here
import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { editTeam, deleteTeam } from "../../../actions/teamActions";
import "../../../css/projectpage.css";

class TeamPage extends React.Component {
	state = {
		oldTeamName: "",
		teamName: "",
		ownerID: "",
		teamMembers: [],
		newEmail: "",
	};
	componentDidMount() {
		this.setState({
			oldTeamName: this.props.viewTeam.teamName,
			teamName: this.props.viewTeam.teamName,
			ownerID: this.props.viewTeam.ownerID,
			teamMembers: this.props.viewTeam.teamMembers,
		});
		if (!this.props.viewTeam.teamMembers) {
			this.props.history.push("/");
		}
	}
	handleKeyPress(e) {
		if (e.key === "Enter") {
			this.addMember();
		}
	}
	async commitEdit() {
		const body = {
			oldTeamName: this.state.oldTeamName,
			newInfo: {
				teamName: this.state.teamName,
				teamMembers: this.state.teamMembers,
			},
		};
		await this.props.editTeam(body);
		this.props.history.push("/teams/dashboard");
	}
	async deleteTeam() {
		await this.props.deleteTeam();
		this.props.history.push("/teams/dashboard");
	}
	async addMember() {
		console.log(this.state.newEmail);
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
			console.log(res.data);
			if (res.data.userID) {
				this.setState({ teamMembers: [...this.state.teamMembers, res.data] });
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
	renderTeam() {
		if (this.state.teamMembers) {
			return this.state.teamMembers.map((member) => {
				return (
					<div key={member.userID} className="member-options">
						<div>{member.userName}</div>

						<button onClick={() => this.removeMember(member)}>
							<i className="remove-member fas fa-minus"></i>
						</button>
					</div>
				);
			});
		}
	}
	render() {
		return (
			<div className="detail-page">
				<h1 className="header">
					<input
						className="project-name"
						defaultValue={this.state.teamName}
						onChange={(e) => {
							this.setState({ teamName: e.target.value });
						}}
					/>
					<button onClick={() => this.deleteTeam()}>
						<i className="far fa-trash-alt"></i>
					</button>
				</h1>
				<div className="main-content team">
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
					<div className="current-members">{this.renderTeam()}</div>
				</div>
				<div className="side-content">leaderboard</div>
				<div className="create-project">
					<button onClick={() => this.commitEdit()}>Commit Changes</button>
				</div>
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

export default connect(mapStateToProps, { editTeam, deleteTeam })(TeamPage);
