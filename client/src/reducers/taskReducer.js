import { GET_TASKS, POST_TASK, TASK_ERROR } from "../actions/types";
const INITIAL_STATE = {
	tasks: [],
	errorMessage: "",
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case GET_TASKS:
			return {
				...state,
				tasks: action.payload,
			};
		case POST_TASK:
			return {
				...state,
				tasks: [...state.tasks, action.payload],
			};
		default:
			return state;
	}
}
