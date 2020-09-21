import React from "react";
import { connect } from "react-redux";

import { getTasks, postTask } from "../../../actions/taskActions";
import Tile from "../../TaskTile";
import Chart from "../../Chart";
import "../../../css/projectpage.css";
import requireSignin from "../../requireSignin";

class ProjectPage extends React.Component {
	state = {
		tasks: [],
		newTask: {
			projectID: "",
			taskName: "",
			isComplete: false,
			isFlagged: false,
			assignedTo: {
				userName: "",
				userID: "",
			},
			pointVal: 0,
			comments: [],
			flagComments: [],
		},
		project: {},
	};
	async componentDidMount() {
		await this.checkUserInfo();
		await this.getTasks();
		await this.setState({
			newTask: {
				...this.state.newTask,
				projectID: this.props.project.projectID,
			},
			tasks: this.props.tasks,
			project: this.props.project,
		});
	}
	checkUserInfo() {
		if (!this.props.project.projectMembers) {
			this.props.history.push("/");
		}
	}
	async getTasks() {
		await this.props.getTasks();
	}
	createProject() {
		this.props.history.push("/projects/create");
	}
	async postTask() {
		await this.props.postTask(this.state.newTask);
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
			const user = this.props.project.projectMembers.filter((member) => {
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

	renderAssignList() {
		const project = this.props.project;

		if (!project.projectMembers) {
			return null;
		} else {
			return project.projectMembers.map((member) => {
				return (
					<option key={member.userID} value={member.userID}>
						{member.userName}
					</option>
				);
			});
		}
	}

	renderTiles() {
		return this.state.tasks.map((task) => {
			return <Tile key={task._id} task={task} />;
		});
	}

	render() {
		if (!this.state.project.projectMembers) {
			return <div>Loading</div>;
		}
		if (this.state.project.projectMembers) {
			return (
				<div className="detail-page">
					<div className="header">
						<h1 className="title">{this.state.project.projectName}</h1>
						<button
							className="edit-button"
							onClick={() => this.props.history.push("/projects/edit")}
						>
							<i className="far fa-edit"> </i>
						</button>
					</div>
					<div className="main-content">
						<div className="task-board">{this.renderTiles()}</div>
					</div>
					<div className="side-content project-page">
						<div className="point-board">
							<Chart
								members={this.state.project.projectMembers.map(
									(member) => member.userName
								)}
								points={this.state.project.projectMembers.map(
									(member) => member.points
								)}
							/>
						</div>
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
									this.postTask();
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
					</div>
				</div>
			);
		} else {
			return <div>Error</div>;
		}
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		project: state.projects.viewProject,
		tasks: state.tasks.tasks,
	};
};

export default connect(mapStateToProps, { getTasks, postTask })(
	requireSignin(ProjectPage)
);
