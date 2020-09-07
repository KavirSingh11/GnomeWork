import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import projectsDashboard from "./pages/projects/ProjectsDashboard";
import projectPage from "./pages/projects/ProjectPage";
import projectCreate from "./pages/projects/ProjectCreate";
import projectEdit from "./pages/projects/ProjectEdit";

import teamsDashboard from "./pages/teams/TeamsDashboard";
import teamPage from "./pages/teams/TeamPage";

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Route path="/" exact component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/projects/dashboard" component={projectsDashboard} />
				<Route path="/projects/view" component={projectPage} />
				<Route path="/projects/edit" component={projectEdit} />
				<Route path="/projects/create" component={projectCreate} />
				<Route path="/teams/dashboard" component={teamsDashboard} />
				<Route path="/teams/view" component={teamPage} />
			</BrowserRouter>
		);
	}
}

export default App;
