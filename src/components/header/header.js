// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";
import {Link} from "react-router-dom";

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
				<Name class={"name--header"}>
					<Link
						to={"/"}
						onClick={this.props.closeMenu}
						className={"name__link"}
					>
						<div className="name__icon">
							<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M27 4C25.5 0.999997 21.5 3 23 6L43 46C44.5 49 48.5 47 47 44L27 4Z" fill="white"/>
								<path fillRule="evenodd" clipRule="evenodd" d="M29 28C32.3541 27.9991 32.3541 32.4991 29 32.5C21.3442 32.5 17.5317 32.5 14.7792 34.208C12.0488 35.9023 10.3614 39.2773 7 46C5.49996 49 1.49994 47 2.99999 44C6.99027 36.0195 8.99026 32.0195 12.2263 30.0146C15.4781 28 19.9781 28 29 28Z" fill="white"/>
								<circle cx="20.245" cy="14.245" r="2.245" fill="white"/>
								<circle cx="16.245" cy="22.245" r="2.245" fill="white"/>
							</svg>
						</div>

						<div className="name__text">
							{"Arnaud"}
							<br />
							{"De Baerdemaeker"}
						</div>
					</Link>
				</Name>
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
						viewBox={"0 0 36 36"}
						class={"svg__menu"}
					>
						<g>
							<path
								d={"M35 8H1C0.447715 8 0 8.44772 0 9C0 9.55228 0.447716 10 1 10H35C35.5523 10 36 9.55228 36 9C36 8.44772 35.5523 8 35 8Z"}
								className={
									this.props.isMenuOpen
									? "icon__hamburgerTop--close"
									: "icon__hamburgerTop"
								}
							/>
							<path
								d={"M35 17H1C0.447715 17 0 17.4477 0 18C0 18.5523 0.447716 19 1 19H35C35.5523 19 36 18.5523 36 18C36 17.4477 35.5523 17 35 17Z"}
								className={
									this.props.isMenuOpen
									? "icon__hamburgerMiddle--close"
									: "icon__hamburgerMiddle"
								}
							/>
							<path
								d={"M35 26H1C0.447715 26 0 26.4477 0 27C0 27.5523 0.447716 28 1 28H35C35.5523 28 36 27.5523 36 27C36 26.4477 35.5523 26 35 26Z"}
								className={
									this.props.isMenuOpen
									? "icon__hamburgerBottom--close"
									: "icon__hamburgerBottom"
								}
							/>
						</g>
					</SVG>
				</Button>
			</header>
		);
	}
}

export default Header;