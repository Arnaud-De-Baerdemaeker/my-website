// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";
import {Helmet} from "react-helmet-async";

import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Hero from "../../components/hero/hero";
import SVG from "../../components/svg/svg";
import Footer from "../../components/footer/footer";

class HomePage extends Component {
	componentDidMount() {
		this.props.backToTop();

		const elementsToHide = document.querySelectorAll(".svg__background, .homepage__introduction, .homepage__title, .homepage__paragraph");

		// Apply a class to initially hide the elements
		this.props.applyHideClass(elementsToHide);

		// Each time the user scrolls, the list of elements is refreshed and sent to a function
		window.addEventListener("scroll", () => {
			const elementsToReveal = elementsToHide;
			this.props.revealOnScroll(elementsToReveal);
		});
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", () => {});
	}

	render() {
		return (
			<>
				<Helmet>
					<meta name="description" content="La page d'accueil de mon site. Qui je suis et ce que je fais." />
					<meta property="og:title" content="Accueil - Arnaud De Baerdemaeker" />
					<meta property="og:type" content="website" />
					<meta property="og:image" content="https://arnaud-de-baerdemaeker.netlify.app/src/images/opengraph/homepage_opengraph.png" />
					<meta property="og:image:width" content="500" />
					<meta property="og:image:height" content="265" />
					<meta property="og:image:type" content="image/png" />
					<meta property="og:url" content="https://arnaud-de-baerdemaeker.netlify.app" />
					<meta property="og:locale" content="fr_BE" />
					<title>Accueil - Arnaud De Baerdemaeker</title>
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
				<Hero id={"heroHomepage"} />
				<main className={"homepage"}>
					<div className={"homepage__myPhoto"}>
						<SVG id={"myPhoto"} />
						<p className={"homepage__introduction"}>
							{"Bonjour, je m'appelle Arnaud !"}
							<br />
							{"Développeur front-end résidant à Liège, en Belgique, et amateur de photographie."}
						</p>
					</div>
					<div className={"homepage__description"}>
						<div className={"homepage__section"}>
							<h3 className={"homepage__title"}>{"Le développement web"}</h3>
							<p className={"homepage__paragraph"}>{"Je suis arrivé dans le domaine du web un peu par hasard, et de fil en aiguille, j'ai été captivé. Mon apprentissage a commencé en tant qu'auto-didacte, internet étant une formidable source de tutoriels. Par la suite, j'ai tenu à officialiser mes acquis avec des formations. Aujourd'hui, je suis heureux d'avoir pu en faire mon métier."}</p>
							<p className={"homepage__paragraph"}>{"Vers la fin de ma formation, l'idée de me créer un petit site personnel s'est imposée. L'objectif était multiple : mettre en pratique les connaissances apprises, me présenter, et montrer les fruits de mon intérêt pour la photographie."}</p>
							<p className={"homepage__paragraph"}>{"Bien que touche-à-tout avec les technologies du web, j'affectionne particulièrement le fait de développer ma créativité pour construire des designs, rédiger des lignes de code, admirer leur logique, et les voir prendre vie dans le navigateur. Réfléchir aux couleurs à utiliser, à la disposition des différents éléments, aux formes, à l'expérience utilisateur, sont autant de problématiques que j'apprécie de résoudre soigneusement."}</p>
						</div>
						<div className={"homepage__section"}>
							<h3 className={"homepage__title"}>{"La photographie"}</h3>
							<p className={"homepage__paragraph"}>{"De la même manière qu'avec le web, je me suis intéressé à la photographie et en ait acquis les bases par moi-même. Ce qui me plait, c'est d'immortaliser l'instant, montrer la beauté dans des choses ordinaires. La nature sous toutes ses formes, les architectures, et les photos rapprochées sont les types de sujets qui m'inspirent le plus."}</p>
							<p className={"homepage__paragraph"}>{"Durant mon temps libre, je prends plaisir à faire du vélo, jouer aux jeux vidéo, lire, ou tout simplement me balader entre-autres."}</p>
						</div>
					</div>
				</main>
				<Footer
					applyHideClass={this.props.applyHideClass}
					revealOnScroll={this.props.revealOnScroll}
				/>
			</>
		);
	}
}

export default HomePage;