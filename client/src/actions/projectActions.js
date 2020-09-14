import {
	GET_PROJECTS,
	POST_PROJECT,
	SET_VIEW_PROJECT,
	PROJECT_ERROR,
} from "./types";
import axios from "axios";

export const getProjects = () => async (dispatch, getState) => {
	const config = {
		headers: {
			"auth-token": getState().auth.authToken,
		},
	};
	var type = "worker";
	if (getState().auth.type === 1) {
		type = "owner";
	}
	try {
		const res = await axios.get(
			`http://localhost:5000/project/${type}/${getState().auth.userID}`,
			config
		);
		dispatch({ type: GET_PROJECTS, payload: res.data });
	} catch (e) {
		dispatch({ type: PROJECT_ERROR, payload: e.message });
	}
};

export const postProject = (project) => async (dispatch, getState) => {
	if (getState().auth.type === 2) {
		dispatch({
			type: PROJECT_ERROR,
			payload: "must be project manager to post project",
		});
	}
	const config = {
		headers: {
			"auth-token": getState().auth.authToken,
		},
	};

	try {
		const res = await axios.post(
			"http://localhost:5000/project/",
			project,
			config
		);
		dispatch({ type: POST_PROJECT, payload: res.data });
	} catch (e) {
		dispatch({ type: PROJECT_ERROR, paylaod: e.message });
	}
};

export const setView = (project) => {
	return { type: SET_VIEW_PROJECT, payload: project };
};
