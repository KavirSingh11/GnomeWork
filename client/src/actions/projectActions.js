import { GET_PROJECTS, POST_PROJECT, PROJECT_ERROR } from "./types";
import axios from "axios";

export const getProjects = (userData) => async (dispatch) => {
	try {
		const res = await axios.post(
			`http://localhost:5000/project/${userData.type}/${userData.id}`
		);
		dispatch({ type: GET_PROJECTS, payload: res.data });
	} catch (e) {
		dispatch({ type: PROJECT_ERROR, payload: e.message });
	}
};

export const postProject = (userData) => async (dispatch) => {
	if (userData.type === 2) {
		dispatch({
			type: PROJECT_ERROR,
			payload: "must be project manager to post project",
		});
	}
	const body = {
		ownerID: userData.id,
	};
	try {
		const res = await axios.post("http://localhost:5000/project/", body);
	} catch (e) {
		dispatch({ type: PROJECT_ERROR, paylaod: e.message });
	}
};
