import {
	GET_TEAMS,
	POST_TEAM,
	EDIT_TEAM,
	DELETE_TEAM,
	TEAM_ERROR,
	SET_VIEW_TEAM,
} from "../actions/types";
import axios from "axios";

export const getTeams = () => async (dispatch, getState) => {
	const config = {
		headers: {
			"auth-token": getState().auth.authToken,
		},
	};
	try {
		let type = "worker";
		if (getState().auth.type === 1) {
			type = "owner";
		}
		const res = await axios.get(
			`http://localhost:5000/team/${type}/${getState().auth.userID}`,
			config
		);
		dispatch({ type: GET_TEAMS, payload: res.data });
	} catch (e) {
		dispatch({ type: TEAM_ERROR, payload: e.message });
	}
};

export const postTeam = (team) => async (dispatch, getState) => {
	const config = {
		headers: {
			"auth-token": getState().auth.authToken,
		},
	};
	try {
		const res = await axios.post("http://localhost:5000/team", team, config);
		dispatch({ type: POST_TEAM, payload: res.data });
	} catch (e) {
		dispatch({ type: TEAM_ERROR, payload: e.message });
	}
};

export const editTeam = (newInfo) => async (dispatch, getState) => {
	let type = "worker";
	if (getState().auth.type === 1) {
		type = "owner";
	}
	const config = {
		headers: {
			"auth-token": getState().auth.authToken,
		},
	};
	try {
		const res = await axios.patch(
			`http://localhost:5000/team/${type}/${getState().teams.viewTeam.ownerID}`,
			newInfo,
			config
		);
		dispatch({ type: EDIT_TEAM, payload: res.data });
	} catch (e) {
		dispatch({ type: TEAM_ERROR, payload: e.message });
	}
};

export const deleteTeam = (team) => async (dispatch, getState) => {
	let type = "worker";
	if (getState().auth.type === 1) {
		type = "owner";
	}
	const config = {
		headers: {
			"auth-token": getState().auth.authToken,
		},
	};
	try {
		const res = await axios.delete(
			`http://localhost:5000/team/${type}/${
				getState().teams.viewTeam.ownerID
			}/${getState().teams.viewTeam.teamName}`,
			config
		);
		dispatch({
			type: DELETE_TEAM,
			payload: getState().teams.viewTeam.teamName,
		});
	} catch (e) {
		dispatch({ type: TEAM_ERROR, payload: e.message });
	}
};

export const setViewTeam = (team) => {
	return { type: SET_VIEW_TEAM, payload: team };
};
