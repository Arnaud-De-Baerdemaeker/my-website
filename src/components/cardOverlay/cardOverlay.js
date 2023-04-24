// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";

class CardOverlay extends Component {
	render() {
		return(
			<div
				ref={this.props.overlayRef}
				className={"overlay--hidden"}
			>
				<h3 className={this.props.overlayTitleClass}>
					{this.props.overlayContent}
				</h3>
			</div>
		);
	}
}

export default CardOverlay;
