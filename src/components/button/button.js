// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";

class Button extends Component {
	render() {
		return (
			<button
				type={"button"}
				onClick={this.props.function && this.props.function}
				alt={this.props.alt}
				className={this.props.class}
			>
				{this.props.children}
			</button>
		);
	}
}

export default Button;