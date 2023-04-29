// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";

class SVG extends Component {
	render() {
		return(
			<svg
				viewBox={this.props.viewBox}
				xmlns={"http://www.w3.org/2000/svg"}
				xmlnsXlink={"http://www.w3.org/1999/xlink"}
				className={this.props.class}
			>
				{this.props.children}
			</svg>
		);
	}
}

export default SVG;