import { AUTH_USER, AUTH_ERROR, SIGNOUT } from "../actions/types";
const INITIAL_STATE = {
	authToken: localStorage.getItem("auth-token"),
	userID: "",
	name: "",
	type: null,
	errorMessage: "",
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case AUTH_USER:
			localStorage.setItem("auth-token", action.payload.token);
			return {
				...state,
				authToken: action.payload.token,
				userID: action.payload.id,
				name: action.payload.name,
				type: action.payload.type,
				errorMessage: "",
			};
		case AUTH_ERROR:
			return {
				...state,
				errorMessage: action.payload,
			};
		case SIGNOUT:
			localStorage.removeItem("auth-token");
			return {
				...state,
				authToken: "",
				userID: "",
				name: "",
				type: null,
				errorMessage: "",
			};
		default:
			return state;
	}
}
