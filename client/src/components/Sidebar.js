import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { signout } from "../actions/authActions";
import "../css/nav.css";
class Sidebar extends React.Component {
	handleSignout() {
		this.props.signout();
	}

	render() {
		return (
			<div className="sidebar">
				<div className="nav-options">
					<div className="nav-header">GnomeWork</div>
					<div className="link">
						<Link to="/teams/dashboard">Teams</Link>
					</div>
					<div className="link">
						<Link to="/">Projects</Link>
					</div>
				</div>
				<button className="signout-button" onClick={() => this.handleSignout()}>
					Signout
				</button>
			</div>
		);
	}
}

export default connect(null, { signout })(Sidebar);
