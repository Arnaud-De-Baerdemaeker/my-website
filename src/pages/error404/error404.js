// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Hero from "../../components/hero/hero";
import Footer from "../../components/footer/footer";

class Error404 extends Component {
	constructor(props) {
		super(props);
		this.tabTitle = "Page non trouvée | Arnaud De Baerdemaeker";
	}

	componentDidMount() {
		this.props.setTabTitle(this.tabTitle);
	}

	render() {
		return(
			<>
				<Header
					isMenuOpen={this.props.isMenuOpen}
					headerRef={this.props.headerRef}
					toggleMenu={this.props.toggleMenu}
					closeMenu={this.props.closeMenu}
				/>
				<Navigation
					isMenuOpen={this.props.isMenuOpen}
					toggleMenu={this.props.toggleMenu}
					closeMenu={this.props.closeMenu}
				/>
				<Hero
					heroContainerClass={" hero__background--404"}
					heroTitleClass={"hero__title--404"}
					heroTitleContent={"La page recherchée n'existe pas"}
					heroBackToHomepage={
						<NavLink
							exact
							to={"/"}
							className={"link__backToHomepage"}
						>
							{"Revenir à l'accueil"}
						</NavLink>
					}
				/>
				<Footer
					applyHideClass={this.props.applyHideClass}
					revealOnScroll={this.props.revealOnScroll}
				/>
			</>
		);
	}
}

export default Error404;