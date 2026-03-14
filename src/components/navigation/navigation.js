// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import {useEffect} from "react";
import {NavLink} from "react-router-dom";

const Navigation = ({closeMenu, isMenuOpen, toggleMenu}) => {
	useEffect(() => {
		// Listens to when the user is scrolling and closeMenu the menu if it is open
		window.addEventListener("scroll", closeMenu);

		return () => {
			window.removeEventListener("scroll", closeMenu);
		}
	}, []);

	return (
		<nav
			onScroll={closeMenu}
			className={isMenuOpen ? "menu" : "menu--closed"}
		>
			<ul className={"menu__list"}>
				<li className={"menu__listItem"}>
					<NavLink
						to={"/"}
						onClick={toggleMenu}
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
						onClick={toggleMenu}
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
						onClick={toggleMenu}
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

export default Navigation;