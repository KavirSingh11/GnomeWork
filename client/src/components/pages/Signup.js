import React from "react";
import { connect } from "react-redux";

import { signup } from "../../actions/authActions";
import requireSignout from "../requireSignout";

class Signup extends React.Component {
	state = {
		type: 2,
		email: "",
		password: "",
		passwordConfirm: "",
		name: "",
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

	checkPassword() {
		if (this.state.password === this.state.passwordConfirm) {
			return true;
		} else {
			this.setState({ error: "Passwords Must Match" });
			return false;
		}
	}

	handleRdbInput(e) {
		if (e.target.value === "pm") {
			this.setState({ type: 1 });
		} else {
			this.setState({ type: 2 });
		}
	}

	handleSubmit() {
		this.clearError();
		if (this.checkPassword()) {
			const userData = {
				email: this.state.email,
				password: this.state.password,
				name: this.state.name,
				type: this.state.type,
			};
			this.props.signup(userData, () => {
				this.props.history.push("/");
			});
		}
	}

	render() {
		return (
			<div className="auth-page">
				<div className="signup-panel">
					<h1>Sign Up</h1>
					<div>
						<h2>Whats Your Name?</h2>
						<input
							placeholder="Name"
							type="text"
							onChange={(e) => this.setState({ name: e.target.value })}
						/>
					</div>
					<div>
						<h2>Enter Your Email</h2>
						<input
							placeholder="Email"
							type="email"
							onChange={(e) => this.setState({ email: e.target.value })}
						/>
					</div>
					<div onChange={(e) => this.handleRdbInput(e)}>
						<h2>What Are You Signin Up As?</h2>
						<div>
							<input
								type="radio"
								value="pm"
								name="pm"
								checked={this.state.type === 1}
							/>
							Project Manager
						</div>
						<div>
							<input
								type="radio"
								value="gnome"
								name="gnome"
								checked={this.state.type === 2}
							/>
							Gnome
						</div>
					</div>
					<div>
						<h2>Enter A Password</h2>
						<input
							placeholder="Password"
							type="password"
							onChange={(e) => this.setState({ password: e.target.value })}
						/>
						<h2>Confirm Password</h2>
						<input
							placeholder="Confirm Password"
							type="password"
							onChange={(e) =>
								this.setState({ passwordConfirm: e.target.value })
							}
						/>
					</div>
					<div>
						<button onClick={() => this.handleSubmit()}>Create Account</button>
					</div>
				</div>
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

export default connect(mapStateToProps, { signup })(requireSignout(Signup));
