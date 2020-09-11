import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { signin } from "../../actions/authActions";
import requireSignout from "../requireSignout";
import "../../css/signin.css";
class Signin extends React.Component {
	state = {
		email: "",
		password: "",
		error: null,
	};

	componentDidMount() {
		if (this.props.error) {
			this.setState({ error: this.props.error });
		}
	}

	clearError() {
		this.setState({ error: null });
	}

	handleSignin() {
		const userData = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.signin(userData, () => this.props.history.push("/"));
	}

	handleKeyPress(e) {
		if (e.key === "Enter") {
			this.handleSignin();
		}
	}

	render() {
		return (
			<div className="auth-page">
				<div className="signin-panel">
					<div className="signin-logo">LOGO HERE</div>
					<div className="signin-fields">
						<div className="email-container">
							<input
								className="email-input"
								type="email"
								placeholder="Email Address"
								onChange={(e) => this.setState({ email: e.target.value })}
								onKeyPress={(e) => this.handleKeyPress(e)}
							/>
						</div>
						<div className="password-container">
							<input
								className="password-input"
								type="password"
								placeholder="Password"
								onChange={(e) => this.setState({ password: e.target.value })}
								onKeyPress={(e) => this.handleKeyPress(e)}
							/>
						</div>
					</div>
				</div>
				<Link className="signup-button" to="/signup">
					Create Account
				</Link>

				{this.state.error ? (
					<div className="error-message">{this.state.error}</div>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		error: state.auth.errorMessage,
	};
};

export default connect(mapStateToProps, {
	signin,
})(requireSignout(Signin));
