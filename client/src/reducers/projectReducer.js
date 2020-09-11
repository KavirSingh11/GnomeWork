import {
	GET_PROJECTS,
	POST_PROJECT,
	SET_VIEW_PROJECT,
	PROJECT_ERROR,
} from "../actions/types";
const INITIAL_STATE = {
	projects: [],
	viewProject: {},
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
		case PROJECT_ERROR:
			return {
				...state,
				errorMessage: action.payload,
			};
		case SET_VIEW_PROJECT:
			return {
				...state,
				viewProject: action.payload,
			};
		default:
			return state;
	}
}
