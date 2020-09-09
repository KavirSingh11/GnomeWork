import React from "react";
import { connect } from "react-redux";

import Sidebar from "./Sidebar";

class App extends React.Component {
	state = {};

	render() {
		return (
			<div>
				{this.props.authToken ? <Sidebar /> : null}
				<div>{this.props.children}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authToken: state.auth.authToken,
	};
};

export default connect(mapStateToProps, {})(App);
