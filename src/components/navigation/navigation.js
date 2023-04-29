// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";
import {NavLink} from "react-router-dom";

class Navigation extends Component {
	componentDidMount() {
		// Listens to when the user is scrolling and closeMenu the menu if it is open
		window.addEventListener("scroll", this.props.closeMenu);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.props.closeMenu);
	}

	render() {
		return (
			<nav
				onScroll={this.props.closeMenu}
				className={this.props.isMenuOpen ? "menu" : "menu--closed"}
			>
				<ul className={"menu__list"}>
					<li className={"menu__listItem"}>
						<NavLink
							to={"/"}
							onClick={this.props.toggleMenu}
							data-link={"Accueil"}
							id={"home"}
							className={"menu__link"}
						>
							{"Accueil"}
						</NavLink>
					</li>
					<li className={"menu__listItem"}>
						<NavLink
							to={"/galerie"}
							onClick={this.props.toggleMenu}
							data-link={"Galerie"}
							id={"gallery"}
							className={"menu__link"}
						>
							{"Galerie"}
						</NavLink>
					</li>
					<li className={"menu__listItem"}>
						<NavLink
							to={"/portfolio"}
							onClick={this.props.toggleMenu}
							data-link={"Portfolio"}
							id={"portfolio"}
							className={"menu__link"}
						>
							{"Portfolio"}
						</NavLink>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Navigation;