import React from "react";

import { connect } from "react-redux";
class ProjectPage extends React.Component {
	render() {
		return (
			<div>
				<div>{this.props.project.projectName}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		project: state.projects.viewProject,
	};
};

export default connect(mapStateToProps, {})(ProjectPage);
