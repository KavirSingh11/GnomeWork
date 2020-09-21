import React from "react";
import { connect } from "react-redux";

import { editTask } from "../actions/taskActions";
import { editProject } from "../actions/projectActions";
import "../css/taskTile.css";
class TaskTile extends React.Component {
	state = {
		canSetToComplete: false, //either you are project owner or assigned to task
		isFlagged: false,
		isComplete: false,
		showMainInfo: true,
		showComments: false,
		showFlagComments: false,
		comments: [],
		flagComments: [],
		newComment: "",
	};
	componentDidMount() {
		if (this.props.task.flagComments.length > 0) {
			this.setState({ isFlagged: true });
		}
		if (
			this.props.auth.type === 1 ||
			this.props.auth.userID === this.props.task.assignedTo.userID
		) {
			this.setState({ canSetToComplete: true });
		}
		this.setState({
			isComplete: this.props.task.isComplete,
			comments: this.props.task.comments,
			flagComments: this.props.task.flagComments,
		});
	}
	/*-----------------------------------------------------------------------------------*/
	async completeTask() {
		this.setState({ isComplete: true });
		//send editTask request
		// set task to completed, remove task from project, and add point value to member assigned to it
		console.log("task finished");
		var taskBody = {
			oldTaskName: this.props.task.taskName,
			newInfo: {
				isComplete: true,
			},
		};
		await this.props.editTask(taskBody);
		let members = this.props.project.projectMembers;
		members.forEach((member) => {
			if (member.userID === this.props.task.assignedTo.userID) {
				member.points += this.props.task.pointVal;
			}
		});
		let body = {
			projectID: this.props.project.projectID,
			projectMembers: members,
		};
		console.log(body);
		await this.props.editProject(body);
	}
	//(un)assign task to whoever clicked
	async assignTask() {
		console.log("task assigned");
		const body = {
			oldTaskName: this.props.task.taskName,
			newInfo: {
				assignedTo: {
					userID: this.props.auth.userID,
					userName: this.props.auth.name,
				},
			},
		};
		await this.props.editTask(body);
	}
	async unassignTask() {
		console.log("task quit");
		const body = {
			oldTaskName: this.props.task.taskName,
			newInfo: {
				assignedTo: {
					userID: "",
					userName: "Unassigned",
				},
			},
		};
		await this.props.editTask(body);
		//send editTask request
	}
	/*-----------------------------------------------------------------------------------*/
	getClassName() {
		var tileClass = "task-view";
		if (this.state.isComplete) {
			return tileClass.concat(" completed");
		}
		if (this.state.isFlagged) {
			return tileClass.concat(" isFlagged");
		}
		return tileClass;
	}
	/*-----------------------------------------------------------------------------------*/
	//TODO:
	//send all changes made here to database through editTask requests
	async addComment() {
		const newComment = {
			comment: this.state.newComment,
			writtenBy: this.props.auth.name,
		};
		console.log(newComment);
		await this.setState({
			comments: [...this.state.comments, newComment],
		});
		const body = {
			oldTaskName: this.props.task.taskName,
			newInfo: {
				comments: this.state.comments,
			},
		};
		await this.props.editTask(body);
		this.setState({ newComment: "" });
	}
	async addFlagComment() {
		console.log(this.state);
		const newComment = {
			comment: this.state.newComment,
			writtenBy: this.props.auth.name,
		};
		await this.setState({
			flagComments: [...this.state.flagComments, newComment],
			isFlagged: true,
		});
		const body = {
			oldTaskName: this.props.task.taskName,
			newInfo: {
				flagComments: this.state.flagComments,
				isFlagged: this.state.isFlagged,
			},
		};
		await this.props.editTask(body);
		this.setState({ newComment: "" });
	}

	async removeComment(comment) {
		var newArray = this.state.comments.filter((stateComment) => {
			return (
				comment.comment + comment.writtenBy !==
				stateComment.comment + stateComment.writtenBy
			);
		});
		await this.setState({ comments: newArray });
		const body = {
			oldTaskName: this.props.task.taskName,
			newInfo: {
				comments: this.state.comments,
			},
		};
		await this.props.editTask(body);
	}
	async removeFlagComment(comment) {
		console.log(this.state);
		var newArray = this.state.flagComments.filter((stateComment) => {
			return (
				comment.comment + comment.writtenBy !==
				stateComment.comment + stateComment.writtenBy
			);
		});
		await this.setState({ flagComments: newArray });
		if (this.state.flagComments.length < 1) {
			this.setState({ isFlagged: false });
		}
		const body = {
			oldTaskName: this.props.task.taskName,
			newInfo: {
				flagComments: this.state.flagComments,
				isFlagged: this.state.isFlagged,
			},
		};
		await this.props.editTask(body);
	}
	/*-----------------------------------------------------------------------------------*/

	renderFlagComments() {
		const task = this.props.task;
		return (
			<div className="showComments task-tile">
				<div>
					<input
						type="text"
						className="add-comment"
						onChange={(e) => this.setState({ newComment: e.target.value })}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								this.addFlagComment();
							}
						}}
					/>
					<button
						className="post-comment"
						onClick={() => this.addFlagComment()}
					>
						<i className="fas fa-plus"></i>
					</button>
				</div>
				{this.state.flagComments.map((comment) => {
					return (
						<div className="comment">
							<h3 className="comment-author">{comment.writtenBy}</h3>
							<div className="comment-controls">
								<p className="comment-content">{comment.comment}</p>
								{comment.writtenBy === this.props.auth.userName ||
								this.props.auth.type === 1 ||
								task.assignedTo.userName === this.props.auth.userName ? (
									<button
										onClick={() => this.removeFlagComment(comment)}
										className="remove-comment"
									>
										<i className="fas fa-minus"></i>
									</button>
								) : null}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
	renderComments() {
		const task = this.props.task;
		return (
			<div className="showComments task-tile">
				<div>
					<input
						type="text"
						className="add-comment"
						onChange={(e) => this.setState({ newComment: e.target.value })}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								this.addComment();
							}
						}}
					/>

					<button className="post-comment" onClick={() => this.addComment()}>
						<i className="fas fa-plus"></i>
					</button>
				</div>
				{this.state.comments.map((comment) => {
					return (
						<div className="comment">
							<h3 className="comment-author">{comment.writtenBy}</h3>
							<div className="comment-controls">
								<p className="comment-content">{comment.comment}</p>
								{comment.writtenBy === this.props.auth.userName ||
								this.props.auth.type === 1 ? (
									<button
										onClick={() => this.removeComment(comment)}
										className="remove-comment"
									>
										<i className="fas fa-minus"></i>
									</button>
								) : null}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
	renderMainInfo() {
		const task = this.props.task;
		return (
			<div className="task-tile">
				<h3 className="title">{task.taskName}</h3>
				<div className="assignedTo">{task.assignedTo.userName}</div>
				<div className="pointVal">{task.pointVal} Points</div>
			</div>
		);
	}
	getTileDisplay() {
		if (this.state.showMainInfo) {
			return this.renderMainInfo();
		}
		if (this.state.showComments) {
			return this.renderComments();
		}
		if (this.state.showFlagComments) {
			return this.renderFlagComments();
		}
	}
	render() {
		const task = this.props.task;
		return (
			<div className={this.getClassName()}>
				{this.getTileDisplay()}
				<div className="task-buttons">
					<button
						onClick={() =>
							this.setState({
								showMainInfo: true,
								showComments: false,
								showFlagComments: false,
							})
						}
						className="taskButton task-mainButton"
					>
						<i className="fas fa-reply"></i>
					</button>
					<button
						onClick={() =>
							this.setState({
								showMainInfo: false,
								showComments: true,
								showFlagComments: false,
							})
						}
						className="taskButton task-commentButton"
					>
						<i className="far fa-comment"></i>
					</button>
					<button
						onClick={() =>
							this.setState({
								showMainInfo: false,
								showComments: false,
								showFlagComments: true,
							})
						}
						className="taskButton task-flagButton"
					>
						<i className="fas fa-exclamation-triangle"></i>
					</button>
					{this.state.canSetToComplete ? (
						<div>
							<button
								onClick={() => this.completeTask()}
								className="taskButton task-completeButton"
							>
								<i className="fas fa-check-circle"></i>
							</button>

							{this.props.task.assignedTo.userName !== "Unassigned" ? (
								<button
									onClick={() => this.unassignTask()}
									className="taskButton task-completeButton"
								>
									<i className="fas fa-user-times"></i>
								</button>
							) : null}
						</div>
					) : (
						<button
							onClick={() => this.assignTask()}
							className="task-completeButton"
						>
							<i className="fas fa-user-plus"></i>
						</button>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		project: state.projects.viewProject,
	};
};

export default connect(mapStateToProps, { editTask, editProject })(TaskTile);
