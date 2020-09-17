import React from "react";
import { connect } from "react-redux";

import Sidebar from "./Sidebar";
import { getUser } from "../actions/authActions";
import "../css/app.css";
class App extends React.Component {
	state = {};

	setContainerName() {
		if (this.props.authToken) {
			return "app-container";
		} else {
			return "auth-container";
		}
	}

	setPanelName() {
		if (this.props.authToken) {
			return "content-panel";
		} else {
			return "auth-panel";
		}
	}

	render() {
		return (
			<div className={this.setContainerName()}>
				{this.props.authToken ? <Sidebar /> : null}
				<div className={this.setPanelName()}>{this.props.children}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authToken: state.auth.authToken,
		userID: state.auth.userID,
	};
};

export default connect(mapStateToProps, { getUser })(App);
