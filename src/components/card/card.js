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
		if(this.props.id === "cardProjects") {
			if("ontouchstart" in window) {
				this.overlayRef.current.classList.replace("overlay--hidden", "overlay--visible");
			}
			else {
				this.cardRef.current.addEventListener("mouseover", this.hoveringIn);
				this.cardRef.current.addEventListener("mouseout", this.hoveringOut);
			}
		}
	}

	componentWillUnmount() {
		this.cardRef.current.removeEventListener("mouseover", this.hoveringIn);
		this.cardRef.current.removeEventListener("mouseout", this.hoveringOut);
	}

	render() {
		if(this.props.id === "cardPhotos") {
			return (
				<li
					ref={this.cardRef}
					onClick={this.props.cardClick}
					className={"card--photo view--hidden"}
				>
					<img
						src={
							sessionStorage.getItem("photos")
							? this.props.photo.url_c
							: this.props.photo.url_c
						}
						alt={""}
						data-hd={
							sessionStorage.getItem("photos")
							? this.props.photo.url_o
							: this.props.photo.url_o
						}
						loading={"lazy"}
						className={"card__image"}
					/>
				</li>
			);
		}
		else if(this.props.id === "cardProjects") {
			return (
				<li
					ref={this.cardRef}
					onClick={this.props.cardClick}
					className={"card--project"}
				>
					<a
						href={this.props.project.link && this.props.project.link}
						target={"_blank"}
						rel={"noreferrer noopener"}
						ref={this.imageRef}
						className={"card__link"}
					>
						<img
							src={this.props.project.image}
							alt={this.props.project.alt}
							className={"card__image"}
						/>
					</a>
					<CardOverlay
						overlayRef={this.overlayRef}
						overlayContent={this.props.project.title}
						overlayTitleClass={"overlay__title--project"}
					/>
				</li>
			);
		}
	}
}

export default Card;
