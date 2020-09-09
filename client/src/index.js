import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter, Route } from "react-router-dom";

import Signin from "./components/pages/Signin";
import Signup from "./components/pages/Signup";

import projectsDashboard from "./components/pages/projects/ProjectsDashboard";
import projectPage from "./components/pages/projects/ProjectPage";
import projectCreate from "./components/pages/projects/ProjectCreate";
import projectEdit from "./components/pages/projects/ProjectEdit";

import teamsDashboard from "./components/pages/teams/TeamsDashboard";
import teamPage from "./components/pages/teams/TeamPage";

import App from "./components/App";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App>
				<Route path="/signin" component={Signin} />
				<Route path="/signup" component={Signup} />
				<Route path="/" exact component={projectsDashboard} />
				<Route path="/projects/view" component={projectPage} />
				<Route path="/projects/edit" component={projectEdit} />
				<Route path="/projects/create" component={projectCreate} />
				<Route path="/teams/dashboard" component={teamsDashboard} />
				<Route path="/teams/view" component={teamPage} />
			</App>
		</BrowserRouter>
	</Provider>,
	document.querySelector("#root")
);
