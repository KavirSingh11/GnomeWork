import React from "react";
import { connect } from "react-redux";

export default (ChildComponent) => {
	class ComposedComponent extends React.Component {
		async componentDidMount() {
			await this.navAway();
		}

		componentDidUpdate() {
			this.navAway();
		}

		navAway() {
			if (!this.props.authToken) {
				this.props.history.push("/signin");
			}
		}
		render() {
			return <ChildComponent {...this.props} />;
		}
	}
	const mapStateToProps = (state) => {
		return { authToken: state.auth.authToken };
	};
	return connect(mapStateToProps)(ComposedComponent);
};
