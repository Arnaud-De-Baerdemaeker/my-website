// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Helmet} from "react-helmet-async";

import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Hero from "../../components/hero/hero";
import Footer from "../../components/footer/footer";

class Error404 extends Component {
	render() {
		return(
			<>
				<Helmet>
					<meta name="description" content="Erreur 404. Page demandée introuvable." />
					<meta property="og:title" content="Page introuvable - Arnaud De Baerdemaeker" />
					<meta property="og:type" content="website" />
					<meta property="og:image" content="https://arnaud-de-baerdemaeker.netlify.app/src/images/404_opengraph.png" />
					<meta property="og:image:width" content="500" />
					<meta property="og:image:height" content="265" />
					<meta property="og:image:type" content="image/png" />
					<meta property="og:locale" content="fr_BE" />
					<title>Page introuvable - Arnaud De Baerdemaeker</title>
				</Helmet>
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
					heroTitleContent={"La page demandée n'existe pas"}
					heroBackToHomepage={
						<NavLink
							exact={"true"}
							to={"/"}
							className={"hero__backToHomepage"}
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