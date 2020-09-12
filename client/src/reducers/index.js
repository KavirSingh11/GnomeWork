import { combineReducers } from "redux";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import taskReducer from "./taskReducer";

export default combineReducers({
	auth: authReducer,
	projects: projectReducer,
	tasks: taskReducer,
});
