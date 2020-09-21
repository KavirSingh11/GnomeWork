import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import {
	editProject,
	deleteProject,
	deleteProjectTasks,
} from "../../../actions/projectActions";
import { postTask, editTask, deleteTask } from "../../../actions/taskActions";
import "../../../css/editPage.css";
import requireSignin from "../../requireSignin";

class ProjectEdit extends React.Component {
	state = {
		projectName: "",
		projectID: "",
		members: [],
		tasks: [],
		newTask: {
			taskName: "",
			assignedTo: {
				userID: "",
				userName: "",
			},
			pointVal: 0,
		},
		editTask: {},
		indexOfEditTask: null,
		newEmail: "",
	};

	//get project tasks
	async componentDidMount() {
		await this.setState({
			projectName: this.props.viewProject.projectName,
			projectID: this.props.viewProject.projectID,
			members: this.props.viewProject.projectMembers,
			tasks: this.props.tasks,
		});
	}

	async commitEdit() {
		const body = {
			projectID: this.state.projectID,
			projectMembers: this.state.members,
			projectName: this.state.projectName,
		};
		await this.props.editProject(body);
		this.props.history.push("/");
	}
	async deleteProject() {
		var answer = window.confirm(
			"Are you sure you want to delete this project?"
		);
		if (answer) {
			await this.props.deleteProject(this.state.projectID);
			await this.props.deleteProjectTasks(this.state.projectID);
			this.props.history.push("/");
		} else {
			console.log("");
		}
	}
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
					assignedTo: { userName: "Unassigned", userID: "" },
				},
			});
		} else {
			const user = this.state.members.filter((member) => {
				return member.userID === e.target.value;
			});
			const assignTo = {
				userID: user[0].userID,
				userName: user[0].userName,
			};
			this.setState({
				newTask: {
					...this.state.newTask,
					assignedTo: assignTo,
				},
			});
		}
	}
	async addTask() {
		const body = {
			projectID: this.props.viewProject.projectID,
			taskName: this.state.newTask.taskName,
			assignedTo: this.state.newTask.assignedTo,
			pointVal: this.state.newTask.pointVal,
		};
		await this.props.postTask(body);
		this.setState({ tasks: [...this.state.tasks, this.state.newTask] });
		const resetNewTask = {
			taskName: "",
			assignedToID: this.state.newTask.assignedTo.userID,
			assignedToName: this.state.newTask.assignedTo.userName,
			pointVal: 0,
		};
		this.setState({ newTask: resetNewTask });
	}
	async removeTask(task) {
		const tempArray = [...this.state.tasks];
		const index = tempArray.indexOf(task);
		await this.props.deleteTask(task);
		if (index !== -1) {
			tempArray.splice(index, 1);
			this.setState({ tasks: tempArray });
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
	async removeMember(member) {
		const newMembers = [...this.state.members];
		const index = newMembers.indexOf(member);
		//find all tasks assigned to removed member and set as unassigned
		const newTasks = [...this.state.tasks];
		const setUnassigned = {
			userID: "",
			userName: "Unassigned",
		};
		newTasks.forEach((task) => {
			if (task.assignedTo.userName === member.userName) {
				task.assignedTo = setUnassigned;
				this.props.editTask(task);
			}
		});
		this.setState({ tasks: newTasks });
		if (index !== -1) {
			newMembers.splice(index, 1);
			this.setState({ members: newMembers });
		}
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

	renderTasks() {
		return this.state.tasks.map((task) => {
			const editTask = task;
			return (
				<div key={task.taskName} className="task-container">
					<div
						className="task-info"
						onClick={() =>
							this.setState({
								editTask: task,
								indexOfEditTask: this.state.tasks.indexOf(task),
							})
						}
					>
						<div className="task-name">{task.taskName}</div>
						<div className="task-assign">{task.assignedTo.userName}</div>
						<div className="task-points">{task.pointVal} Points</div>
					</div>
					<div className="task-remove" onClick={() => this.removeTask(task)}>
						-
					</div>
				</div>
			);
		});
	}
	setEditTask(e) {
		if (e.target.value === "Unassigned") {
			this.setState({
				editTask: {
					...this.state.editTask,
					assignedTo: { userName: "Unassigned", userID: "" },
				},
			});
		} else {
			const user = this.state.members.filter((member) => {
				return member.userID === e.target.value;
			});
			const assignTo = {
				userID: user[0].userID,
				userName: user[0].userName,
			};
			this.setState({
				editTask: {
					...this.state.editTask,
					assignedTo: assignTo,
				},
			});
		}
	}
	async handleTaskEdit(button) {
		if (button === "Enter" || !button) {
			var tempTasks = this.state.tasks;
			const oldTaskName = tempTasks[this.state.indexOfEditTask].taskName;
			const body = {
				oldTaskName: oldTaskName,
				newInfo: this.state.editTask,
			};
			tempTasks[this.state.indexOfEditTask] = this.state.editTask;
			this.setState({ tasks: tempTasks, editTask: {}, indexOfEditTask: null });
			await this.props.editTask(body);
		}
	}
	renderEditAssign() {
		if (!this.state.members) {
			return <option value="Unassigned">Unassigned</option>;
		} else {
			return this.state.members.map((member) => {
				return (
					<option
						key={member.userID}
						value={member.userID}
						selected={
							this.state.editTask.assignedTo.userName === member.userName
								? "selected"
								: null
						}
					>
						{member.userName}
					</option>
				);
			});
		}
	}
	renderEditField() {
		return (
			<div className="task-container">
				<div className="task-info">
					<span className="edit edit-task-name">
						<input
							type="text"
							value={this.state.editTask.taskName}
							onChange={(e) =>
								this.setState({
									editTask: {
										...this.state.editTask,
										taskName: e.target.value,
									},
								})
							}
							onKeyPress={(e) => this.handleTaskEdit(e.key)}
						/>
					</span>
					<span className="edit edit-task-assign">
						<select onChange={(e) => this.setEditTask(e)}>
							<option
								value="Unassigned"
								selected={
									this.state.editTask.assignedTo.userName === "Unassigned"
										? "selected"
										: null
								}
							>
								Unassigned
							</option>
							{this.renderEditAssign()}
						</select>
					</span>
					<span className="edit edit-task-points">
						<input
							type="text"
							value={this.state.editTask.pointVal}
							onChange={(e) =>
								this.setState({
									editTask: {
										...this.state.editTask,
										pointVal: e.target.value,
									},
								})
							}
							onKeyPress={(e) => this.handleTaskEdit(e.key)}
						/>
					</span>
					<div className="add-member" onClick={() => this.handleTaskEdit()}>
						+
					</div>
				</div>
			</div>
		);
	}
	renderMembers() {
		return this.state.members.map((member) => {
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
	render() {
		return (
			<div className="detail-page">
				<div className="header">
					<input
						className="project-name"
						defaultValue={this.state.projectName}
						onChange={(e) => {
							this.setState({ projectName: e.target.value });
						}}
					/>
					<button onClick={() => this.deleteProject()}>
						<i className="far fa-trash-alt"></i>
					</button>
				</div>
				<div className="main-content create">
					<h1 className="content-header">Add A Task</h1>
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
								this.addTask();
							}}
							className="add-task"
						>
							Add Task
						</button>
					</div>
					<div className="view-tasks">
						{this.renderTasks()}
						{this.state.editTask.taskName ? this.renderEditField() : null}
					</div>
				</div>
				<div className="side-content">
					<h1 className="content-header">Edit Members</h1>

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
				</div>
				<div className="create-project">
					<button onClick={() => this.commitEdit()}>Finish Edit</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		viewProject: state.projects.viewProject,
		tasks: state.tasks.tasks,
	};
};

export default connect(mapStateToProps, {
	editProject,
	deleteProject,
	deleteProjectTasks,
	postTask,
	editTask,
	deleteTask,
})(requireSignin(ProjectEdit));
