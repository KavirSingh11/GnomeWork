import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { postTask } from "../../../actions/taskActions";
import { postProject } from "../../../actions/projectActions";
import "../../../css/createPage.css";
import requireSignin from "../../requireSignin";

class ProjectCreate extends React.Component {
	state = {
		projectID: "",
		projectName: "Project Name",
		members: [],
		tasks: [],
		newTask: {
			taskName: "",
			assignedToID: "",
			assignedToName: "Unassigned",
			pointVal: 0,
		},
		newEmail: "",
		potentialTeam: {},
	};

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
			if (res.data.userID) {
				this.setState({ members: [...this.state.members, res.data] });
			} else {
				alert("user not found");
			}
		} catch (e) {
			alert(`Error: ${e.message}`);
		}
		this.setState({ newEmail: "" });
	}

	async createProject() {
		const project = {
			ownerID: this.props.auth.userID,
			projectName: this.state.projectName,
			projectMembers: this.state.members,
		};
		await this.props.postProject(project);
		const projectID = this.props.projects[this.props.projects.length - 1]
			.projectID;
		this.state.tasks.forEach((task) => {
			const body = {
				projectID: projectID,
				taskName: task.taskName,
				assignedTo: {
					userID: task.assignedToID,
					userName: task.assignedToName,
				},
				pointVal: task.pointVal,
			};
			this.uploadTask(body);
		});
		this.props.history.push("/");
	}

	async uploadTask(body) {
		await this.props.postTask(body);
	}
	/*
	----------------------------------------------------------------------------------------------------*/

	handleKeyPress(e) {
		if (e.key === "Enter") {
			this.addMember();
		}
	}

	setNewTask(e) {
		if (e.target.value === "Unassigned") {
			this.setState({
				newTask: {
					...this.state.newTask,
					assignedToName: "Unassigned",
					assignedToID: "",
				},
			});
		} else {
			const user = this.state.members.filter((member) => {
				return member.userID === e.target.value;
			});

			this.setState({
				newTask: {
					...this.state.newTask,
					assignedToName: user[0].userName,
					assignedToID: user[0].userID,
				},
			});
		}
	}

	selectTeam(teamName) {
		if (teamName === "no team") {
			this.setState({ potentialTeam: {} });
		} else {
			const team = this.props.teams.filter((team) => {
				return team.teamName === teamName;
			});
			this.setState({ potentialTeam: team[0] });
		}
	}
	addTeam() {
		console.log(this.state.potentialTeam.teamMembers);
		if (!this.state.potentialTeam.teamMembers) {
			this.setState({ members: [] });
		} else {
			const newMembers = [];
			this.state.potentialTeam.teamMembers.forEach((member) => {
				const newMember = {
					userID: member.userID,
					userEmail: member.userEmail,
					userName: member.userName,
					points: 0,
				};
				newMembers.push(newMember);
			});

			this.setState({ members: newMembers });
		}
	}

	/*----------------------------------------------------------------------------------------------------
	 */
	renderTeams() {
		if (!this.props.teams) {
			return null;
		}
		return this.props.teams.map((team) => {
			return (
				<option key={team.teamName} value={team.teamName}>
					{team.teamName}
				</option>
			);
		});
	}

	renderAssignList() {
		if (!this.state.members) {
			return null;
		} else {
			return this.state.members.map((member) => {
				return (
					<option key={member.userID} value={member.userID}>
						{member.userName}
					</option>
				);
			});
		}
	}

	renderMembers() {
		return this.state.members.map((member) => {
			return (
				<div key={member.userID} className="member-options">
					<div>{member.userName}</div>
					<i className="remove-member fas fa-minus"></i>
				</div>
			);
		});
	}

	renderTasks() {
		return this.state.tasks.map((task) => {
			return (
				<div key={task.taskName} className="task-container">
					<div className="task-info">
						<div className="task-name">{task.taskName}</div>
						<div className="task-assign">{task.assignedToName}</div>
						<div className="task-points">{task.pointVal} Points</div>
					</div>
					<div className="task-remove">-</div>
				</div>
			);
		});
	}

	render() {
		return (
			<div className="detail-page">
				<div className="header">
					<input
						className="project-name"
						type="text"
						defaultValue="Project name"
						onChange={(e) => this.setState({ projectName: e.target.value })}
					/>
				</div>
				<div className="main-content create">
					<h1 className="content-header">Add initial tasks</h1>
					<div className="input-task">
						<input
							type="text"
							placeholder="Task name"
							className="inputField name"
							value={this.state.newTask.taskName}
							onChange={(e) =>
								this.setState({
									newTask: {
										...this.state.newTask,
										taskName: e.target.value,
									},
								})
							}
						/>
						<select
							onChange={(e) => this.setNewTask(e)}
							className="inputField assign"
						>
							<option value="Unassigned">Unassigned</option>
							{this.renderAssignList()}
						</select>
						<div className="points-container">
							<input
								type="number"
								className="inputField points"
								value={this.state.newTask.pointVal}
								onChange={(e) => {
									var number = e.target.value;
									if (!e.target.type === "number") {
										number = parseInt(e.target.value);
									}
									this.setState({
										newTask: {
											...this.state.newTask,
											pointVal: number,
										},
									});
								}}
							/>
							Points
						</div>
						<button
							onClick={() => {
								this.setState({
									tasks: [...this.state.tasks, this.state.newTask],
								});
								const resetNewTask = {
									taskName: "",
									assignedToID: this.state.newTask.assignedToID,
									assignedToName: this.state.newTask.assignedToName,
									pointVal: 0,
								};
								this.setState({ newTask: resetNewTask });
							}}
							className="add-task"
						>
							Add Task
						</button>
					</div>
					<div className="view-tasks">{this.renderTasks()}</div>
					<div></div>
				</div>
				<div className="side-content">
					<h1 className="content-header">Add Members</h1>

					<div className="new-member">
						<input
							type="email"
							placeholder="Email"
							className="new-email"
							onChange={(e) => this.setState({ newEmail: e.target.value })}
							value={this.state.newEmail}
							onKeyPress={(e) => this.handleKeyPress(e)}
						/>
						<div className="add-member" onClick={() => this.addMember()}>
							+
						</div>
					</div>
					<div className="current-members">
						<h3>Current Members</h3>
						{this.renderMembers()}
					</div>
					<div className="select-team">
						<h2>Select Team</h2>
						<select
							className="team-list"
							onChange={(e) => this.selectTeam(e.target.value)}
						>
							<option value={"no team"}>No Team</option>
							{this.renderTeams()}
						</select>
						<button
							className="add-task add-team"
							onClick={() => this.addTeam()}
						>
							Add Team
						</button>
					</div>
				</div>
				<div className="create-project">
					<button onClick={() => this.createProject()}>Create</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		projects: state.projects.projects,
		teams: state.teams.teams,
	};
};

export default connect(mapStateToProps, { postProject, postTask })(
	requireSignin(ProjectCreate)
);
