// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faInstagram, faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons";

import Name from "../name/name";
import SVGFooter from "../svg/svgFooter";
import SVG from "../svg/svg";

const Footer = ({applyHideClass, revealOnScroll}) => {
	const year = new Date();

	// useEffect(() => {
	// 	const fetchedElements = document.querySelectorAll(".footer__links, .name--footer, .footer__credits");
	// 	// Apply a class to initially hide the elements
	// 	applyHideClass(fetchedElements);
	// 	// Each time the user scrolls, the list of elements is refreshed and sent to a function
	// 	window.addEventListener("scroll", () => {
	// 		const refetchedElements = fetchedElements;
	// 		revealOnScroll(refetchedElements);
	// 	});

	// 	return () => {
	// 		window.removeEventListener("scroll", () => {});
	// 	}
	// }, []);

	return (
		<footer className={"footer"}>
			<ul className={"footer__socialNetworks"}>
				<li className={"footer__network"}>
					<a
						href={"mailto:de.baerdemaeker.arnaud@gmail.com"}
						target={"_blank"}
						rel={"noreferrer noopener"}
						className={"footer__link"}
					>
						<FontAwesomeIcon
							icon={faEnvelope}
							alt={"Email"}
							title={"Contactez-moi"}
							className={"footer__icon"}
						/>
					</a>
				</li>
				<li className={"footer__network"}>
					<a
						href={"https://www.instagram.com/los.2102/"}
						target={"_blank"}
						rel={"noreferrer noopener"}
						className={"footer__link"}
					>
						<FontAwesomeIcon
							icon={faInstagram}
							alt={"Instagram"}
							title={"Mon profil Instagram"}
							className={"footer__icon"}
						/>
					</a>
				</li>
				<li className={"footer__network"}>
					<a
						href={"https://www.linkedin.com/in/arnaud-de-baerdemaeker/"}
						target={"_blank"}
						rel={"noreferrer noopener"}
						className={"footer__link"}
					>
						<FontAwesomeIcon
							icon={faLinkedin}
							alt={"LinkedIn"}
							title={"Mon profil LinkedIn"}
							className={"footer__icon"}
						/>
					</a>
				</li>
				<li className={"footer__network"}>
					<a
						href={"https://github.com/Arnaud-De-Baerdemaeker"}
						target={"_blank"}
						rel={"noreferrer noopener"}
						className={"footer__link"}
					>
						<FontAwesomeIcon
							icon={faGithub}
							alt={"GitHub"}
							title={"Mon travail sur GitHub"}
							className={"footer__icon"}
						/>
					</a>
				</li>
			</ul>

			<p className={"footer__year"}>{year.getUTCFullYear()}</p>

			<Name nameClass={"name--footer"}>{"Arnaud De Baerdemaeker"}</Name>

			<SVGFooter />
		</footer>
	);
}

export default Footer;
