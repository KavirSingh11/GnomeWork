import { AUTH_USER, AUTH_ERROR, SIGNOUT } from "./types";
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

export const signout = () => {
	return {
		type: SIGNOUT,
	};
};
