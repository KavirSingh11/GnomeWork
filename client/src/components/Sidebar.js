import React from "react";
import { connect } from "react-redux";

import { signout } from "../actions/authActions";

class Sidebar extends React.Component {
	handleSignout() {
		this.props.signout();
	}

	render() {
		return (
			<div>
				<div>Sidebar</div>
				<button onClick={() => this.handleSignout()}>Signout</button>
			</div>
		);
	}
}

export default connect(null, { signout })(Sidebar);
