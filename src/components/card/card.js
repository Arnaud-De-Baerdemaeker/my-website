// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component, createRef} from "react";

import CardOverlay from "../cardOverlay/cardOverlay";

class Card extends Component {
	constructor(props) {
		super(props);

		this.cardRef = createRef();
		this.overlayRef = createRef();

		this.hoveringIn = this.hoveringIn.bind(this);
		this.hoveringOut = this.hoveringOut.bind(this);
	}

	hoveringIn() {
		this.overlayRef.current.classList.replace("overlay--hidden", "overlay--visible");
	}

	hoveringOut() {
		this.overlayRef.current.classList.replace("overlay--visible", "overlay--hidden");
	}

	componentDidMount() {
		if("ontouchstart" in window) {
			this.overlayRef.current.classList.replace("overlay--hidden", "overlay--visible");
		}
		else {
			this.cardRef.current.addEventListener("mouseover", this.hoveringIn);
			this.cardRef.current.addEventListener("mouseout", this.hoveringOut);
		}
	}

	componentWillUnmount() {
		this.cardRef.current.removeEventListener("mouseover", this.hoveringIn);
		this.cardRef.current.removeEventListener("mouseout", this.hoveringOut);
	}

	render() {
		return(
			<li
				ref={this.cardRef}
				onClick={this.props.cardClick}
				className={this.props.cardClass}
			>
				{this.props.cardContent}
				<CardOverlay
					overlayRef={this.overlayRef}
					overlayContent={this.props.cardOverlayContent}
					overlayTitleClass={this.props.cardOverlayTitleClass}
				/>
			</li>
		);
	}
}

export default Card;
