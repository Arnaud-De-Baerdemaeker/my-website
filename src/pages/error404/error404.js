// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import {useEffect} from "react";
import {NavLink} from "react-router-dom";

import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Hero from "../../components/hero/hero";
import Footer from "../../components/footer/footer";

const Error404 = ({setTabTitle, isMenuOpen, headerRef, toggleMenu, closeMenu, applyHideClass, revealOnScroll}) => {
	const tabTitle = "Page non trouvée | Arnaud De Baerdemaeker";

	useEffect(() => {
		setTabTitle(tabTitle);
	}, []);

	return (
		<>
			<Header
				isMenuOpen={isMenuOpen}
				headerRef={headerRef}
				toggleMenu={toggleMenu}
				closeMenu={closeMenu}
			/>
			<Navigation
				isMenuOpen={isMenuOpen}
				toggleMenu={toggleMenu}
				closeMenu={closeMenu}
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
				applyHideClass={applyHideClass}
				revealOnScroll={revealOnScroll}
			/>
		</>
	);
}

export default Error404;