import {
	GET_TASKS,
	POST_TASK,
	EDIT_TASK,
	DELETE_TASK,
	TASK_ERROR,
} from "../actions/types";
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
		case EDIT_TASK:
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.taskName === action.payload.taskName ? action.payload : task
				),
			};
		case DELETE_TASK:
			return {
				...state,
				tasks: state.tasks.filter((task) => task.taskName !== action.payload),
			};
		default:
			return state;
	}
}
