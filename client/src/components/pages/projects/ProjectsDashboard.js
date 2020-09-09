import React from "react";
import { connect } from "react-redux";

import requireSignin from "../../requireSignin";

class ProjectsDashboard extends React.Component {
	componentDidMount() {}

	render() {
		return (
			<div>
				<div>ProjectsDashboard</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, {})(requireSignin(ProjectsDashboard));
