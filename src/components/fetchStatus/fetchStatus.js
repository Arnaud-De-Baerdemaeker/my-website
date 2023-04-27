// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";

import SVG from "../svg/svg";

class FetchError extends Component {
	render() {
		return(
			<div className={"fetchStatus"}>
				<div className={"fetchStatus__icon"}>
					<SVG
						viewBox={"0 0 36 36"}
						class={this.props.svgClass}
					>
						{this.props.svgPath}
					</SVG>
				</div>
				<p className={"fetchStatus__message"}>
					{this.props.message}
				</p>
			</div>
		);
	}
}

export default FetchError;
