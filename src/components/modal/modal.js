// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";

import Button from "../button/button";
import SVG from "../svg/svg";

class Modal extends Component {
	render() {
		return (
			<div className={
				this.props.isModalOpen
				? "modal"
				: "modal--hidden"
			}>
				<div className={"modal__imageContainer"}>
					<img
						src={this.props.hd}
						alt={this.props.imgAlt}
						className={"modal__image"}
					/>
				</div>
				<Button
					function={this.props.toggleModal}
					class={"button__modal"}
				>
					<SVG id={"closeIcon"} />
				</Button>
			</div>
		);
	}
}

export default Modal;