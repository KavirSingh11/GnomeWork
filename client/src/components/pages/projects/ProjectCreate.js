import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { postTask } from "../../../actions/taskActions";
import { postProject } from "../../../actions/projectActions";
class ProjectCreate extends React.Component {
	state = {
		projectID: "",
		projectName: "",
		members: [
			{
				userID: "5f55ce31026e9d64a0b14f59",
				userEmail: "gnome2@gmail.com",
				userName: "gnome2",
				points: 0,
			},
			{
				userID: "5f55ce37026e9d64a0b14f5a",
				userEmail: "gnome3@gmail.com",
				userName: "gnome3",
				points: 0,
			},
		],
		tasks: [],
		newTask: {
			taskName: "",
			assignedToID: "",
			assignedToName: "",
			pointVal: 0,
		},
		newEmail: "",
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
		console.log(projectID);
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

	/*----------------------------------------------------------------------------------------------------
	 */
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
					<div>-</div>
				</div>
			);
		});
	}

	renderTasks() {
		return this.state.tasks.map((task) => {
			return (
				<div key={task.taskName}>
					<div>{task.taskName}</div>
					<div>{task.assignedToName}</div>
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
						placeholder="Enter name"
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
						<div>
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
									assignedToID: "",
									assignedToName: "",
									pointVal: 0,
								};
								this.setState({ newTask: resetNewTask });
							}}
						>
							Add Task
						</button>
					</div>
					<div className="view-tasks">{this.renderTasks()}</div>
					<div></div>
				</div>
				<div className="side-content">
					<div>
						<h1>Add Members</h1>
						{this.renderMembers()}
					</div>
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
				</div>
				<div>
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
	};
};

export default connect(mapStateToProps, { postProject, postTask })(
	ProjectCreate
);
