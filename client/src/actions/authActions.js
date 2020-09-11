import { AUTH_USER, GET_USER, AUTH_ERROR, SIGNOUT } from "./types";
import axios from "axios";

export const signin = (userData, callback) => async (dispatch) => {
	try {
		const res = await axios.post("http://localhost:5000/signin", userData);
		dispatch({ type: AUTH_USER, payload: res.data });
		callback();
	} catch (e) {
		dispatch({ type: AUTH_ERROR, payload: e.message });
	}
};

export const signup = (userData, callback) => async (dispatch) => {
	try {
		const res = await axios.post("http://localhost:5000/signup", userData);
		dispatch({ type: AUTH_USER, payload: res.data });
		callback();
	} catch (e) {
		dispatch({ type: AUTH_ERROR, payload: e.message });
	}
};

export const getUser = (token) => async (dispatch) => {
	const config = {
		headers: {
			"auth-token": token,
			auth: token,
		},
	};
	try {
		const res = await axios.get("http://localhost:5000/getUser", config);
		dispatch({ type: GET_USER, payload: res.data });
		console.log("user info fetched");
	} catch (e) {
		dispatch({ type: AUTH_ERROR, payload: e.message });
	}
};

export const signout = () => {
	return {
		type: SIGNOUT,
	};
};
