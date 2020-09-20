import {
	GET_TEAMS,
	POST_TEAM,
	EDIT_TEAM,
	DELETE_TEAM,
	TEAM_ERROR,
	SET_VIEW_TEAM,
} from "../actions/types";

const INITIAL_STATE = {
	teams: [],
	viewTeam: {},
	errorMessage: "",
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case GET_TEAMS:
			return {
				...state,
				teams: action.payload,
			};
		case POST_TEAM:
			return {
				...state,
				teams: [...state.teams, action.payload],
			};
		case EDIT_TEAM: {
			return {
				...state,
				teams: state.teams.map((team) =>
					team.teamName === action.payload.teamName ? action.payload : team
				),
			};
		}
		case DELETE_TEAM: {
			return {
				...state,
				teams: state.teams.filter((team) => team.teamName !== action.payload),
			};
		}
		case SET_VIEW_TEAM:
			return {
				...state,
				viewTeam: action.payload,
			};
		case TEAM_ERROR:
			return {
				...state,
				errorMessage: action.payload,
			};
		default:
			return state;
	}
}
