// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import {useEffect} from "react";
import {NavLink} from "react-router-dom";

import SVGNavigationBackground from "../svg/svgNavigationBackground";
import SVGNavigationLinkHover from "../svg/svgNavigationLinkHover";
import SVGNavigationLinkActive from "../svg/svgNavigationLinkActive";

const Navigation = ({closeMenu, isMenuOpen, toggleMenu}) => {
	const links = [
		{
			path: "/",
			id: "home",
			label: "Accueil"
		},
		{
			path: "/galerie",
			id: "gallery",
			label: "Galerie"
		},
		{
			path: "/portfolio",
			id: "portfolio",
			label: "Portfolio"
		}
	];

	// useEffect(() => {
	// 	// Listens to when the user is scrolling and closeMenu the menu if it is open
	// 	window.addEventListener("scroll", closeMenu);

	// 	return () => {
	// 		window.removeEventListener("scroll", closeMenu);
	// 	}
	// }, []);

	return (
		<nav
			// onScroll={closeMenu}
			className={"menu"}
		>
			<ul className={"menu__list"}>
				{links.map((link) => (
					<li
						key={link.id}
						className={"menu__listItem"}
					>
						<NavLink
							to={link.path}
							id={link.id}
							className={"menu__link"}
						>
							{link.label}

							<SVGNavigationLinkHover />

							<SVGNavigationLinkActive />
						</NavLink>
					</li>
				))}
			</ul>

			<SVGNavigationBackground />
		</nav>
	);
}

export default Navigation;