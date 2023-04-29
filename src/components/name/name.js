// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";

class Name extends Component {
	render() {
		return (
			<h1 className={this.props.class}>
				{this.props.children}
			</h1>
		);
	}
}

export default Name;