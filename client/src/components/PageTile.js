import React from "react";

class PageTile extends React.Component {
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
				<h1 className="tile-completion">{this.props.completion}</h1>
			</div>
		);
	}
}

export default PageTile;
