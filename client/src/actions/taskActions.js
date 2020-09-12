import { GET_TASKS, POST_TASK, TASK_ERROR } from "./types";
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
