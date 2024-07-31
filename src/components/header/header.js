// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";

import Name from "../name/name";
import Button from "../button/button";
import SVG from "../svg/svg";

class Header extends Component {
	constructor(props) {
		super(props);

		this.handleHeaderBackground = this.handleHeaderBackground.bind(this);
	}

	handleHeaderBackground() {
		if(window.scrollY === 0) {
			this.props.headerRef.current.classList.remove("scroll");
		}
		else {
			this.props.headerRef.current.classList.add("scroll");
		}
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleHeaderBackground);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleHeaderBackground);
	}

	render() {
		return (
			<header
				ref={this.props.headerRef}
				className={"header"}
			>
				<Name id={"nameHeader"} />
				<Button
					alt={
						this.props.isMenuOpen
						? "Fermer le menu"
						: "Ouvrir le menu"
					}
					function={this.props.toggleMenu}
					class={"button__menu"}
				>
					<SVG
						id={"menuIcon"}
						isMenuOpen={this.props.isMenuOpen}
					/>
				</Button>
			</header>
		);
	}
}

export default Header;