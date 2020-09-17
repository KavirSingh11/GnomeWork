import React from "react";

import "../css/projTile.css";
class ProjectTile extends React.Component {
	state = {};
	renderMembers() {
		return this.props.members.map((member) => {
			return (
				<li className="tile-list-item" key={member._id}>
					{member.userName}
				</li>
			);
		});
	}
	render() {
		return (
			<div className="tile" onClick={() => this.props.handleClick()}>
				<h2 className="tile-title">{this.props.name}</h2>
				<ul className="tile-list">{this.renderMembers()}</ul>
				{this.props.completion ? (
					<h1 className="tile-completion">{this.props.completion}%</h1>
				) : null}
			</div>
		);
	}
}

export default ProjectTile;
