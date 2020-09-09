import { GET_PROJECTS, POST_PROJECT, PROJECT_ERROR } from "../actions/types";
const INITIAL_STATE = {
	projects: [],
	errorMessage: "",
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case GET_PROJECTS:
			return {
				...state,
				projects: action.payload,
			};
		case POST_PROJECT:
			return {
				...state,
				projects: [...state.projects, action.payload],
			};
		default:
			return state;
	}
}
