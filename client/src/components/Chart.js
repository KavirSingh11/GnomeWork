import React from "react";
import { Pie } from "react-chartjs-2";

class Chart extends React.Component {
	state = {
		chartData: {
			labels: this.props.members,
			datasets: [
				{
					label: "Points",
					backgroundColor: [
						"red",
						"green",
						"blue",
						"yellow",
						"purple",
						"orange",
					],
					data: this.props.points,
				},
			],
		},
	};

	render() {
		return (
			<div className="chart">
				<Pie data={this.state.chartData} />
			</div>
		);
	}
}

export default Chart;
