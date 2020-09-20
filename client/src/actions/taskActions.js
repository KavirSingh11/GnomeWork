import {
	GET_TASKS,
	POST_TASK,
	EDIT_TASK,
	DELETE_TASK,
	TASK_ERROR,
} from "./types";
import axios from "axios";

export const getTasks = () => async (dispatch, getState) => {
	const config = {
		headers: {
			"auth-token": getState().auth.authToken,
		},
	};
	try {
		const res = await axios.get(
			`http://localhost:5000/task/${getState().projects.viewProject.projectID}`,
			config
		);
		dispatch({ type: GET_TASKS, payload: res.data });
	} catch (e) {
		dispatch({ type: TASK_ERROR, payload: e.message });
	}
};

export const postTask = (taskInfo) => async (dispatch, getState) => {
	const config = {
		headers: {
			"auth-token": getState().auth.authToken,
		},
	};
	try {
		const res = await axios.post(
			"http://localhost:5000/task",
			taskInfo,
			config
		);
		dispatch({ type: POST_TASK, payload: res.data });
	} catch (e) {
		dispatch({ type: TASK_ERROR, payload: e.message });
	}
};

export const editTask = (body) => async (dispatch, getState) => {
	const config = {
		headers: {
			"auth-token": getState().auth.authToken,
		},
	};
	try {
		const res = await axios.patch(
			`http://localhost:5000/task/${getState().projects.viewProject.projectID}`,
			body,
			config
		);
		dispatch({ type: EDIT_TASK, payload: res.data });
	} catch (e) {
		dispatch({ type: TASK_ERROR, payload: e.message });
	}
};

export const deleteTask = (task) => async (dispatch, getState) => {
	const config = {
		headers: {
			"auth-token": getState().auth.authToken,
		},
	};
	try {
		await axios.delete(
			`http://localhost:5000/task/${
				getState().projects.viewProject.projectID
			}/${task.taskName}`,
			config
		);
		dispatch({ type: DELETE_TASK, payload: task.taskName });
	} catch (e) {
		dispatch({ type: TASK_ERROR, payload: e.message });
	}
};
