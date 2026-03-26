// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import {useEffect} from "react";

import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Hero from "../../components/hero/hero";
import SVGHomeHero from "../../components/svg/svgHomeHero";
import SVGPortrait from "../../components/svg/svgPortrait";
import SVGAmpersand from "../../components/svg/svgAmpersand";
import MainTitle from "../../components/mainTitle/mainTitle";
import Footer from "../../components/footer/footer";

const HomePage = ({headerRef, setTabTitle, backToTop, applyHideClass, revealOnScroll}) => {
	const tabTitle = "Accueil | Arnaud De Baerdemaeker";

	useEffect(() => {
		// setTabTitle(tabTitle);
		// backToTop();

		// const elementsToHide = document.querySelectorAll(".svg__background, .homepage__introduction, .homepage__title, .homepage__paragraph");

		// Apply a class to initially hide the elements
		// applyHideClass(elementsToHide);

		// Each time the user scrolls, the list of elements is refreshed and sent to a function
		// window.addEventListener("scroll", () => {
		// 	const elementsToReveal = elementsToHide;
		// 	revealOnScroll(elementsToReveal);
		// });

		// return () => {
		// 	window.removeEventListener("scroll", () => {});
		// }
	}, []);

	return (
		<div className={"structure"}>
			<Header headerRef={headerRef} />

			<Hero scrollDown={true}>
				<MainTitle mainTitleClass={"mainTitle mainTitle--homepage"}>
					<div className="mainTitle__group mainTitle__group--start">
						<span className={"mainTitle__title mainTitle__title--normal"}>{"Développeur"}</span>
						<span className={"mainTitle__title mainTitle__title--bold"}>{"web"}</span>
					</div>

					<SVGAmpersand />

					<div className="mainTitle__group mainTitle__group--end">
						<span className={"mainTitle__title mainTitle__title--normal"}>{"Amateur de"}</span>
						<span className={"mainTitle__title mainTitle__title--bold"}>{"photographie"}</span>
					</div>
				</MainTitle>

				<SVGHomeHero />
			</Hero>

			<main className={"homepage container"}>
				<div className={"homepage__description"}>
					<h2 className={"homepage__introduction"}>
						{"Bonjour, je m'appelle Arnaud !"}
						<br />
						{"Développeur/intégrateur web résidant à Liège, en Belgique, et amateur de photographie."}
					</h2>

					<div className={"homepage__presentation"}>
						<div className={"homepage__section"}>
							<h3
								className={"homepage__title"}
								data-title={"Le développement web"}
							>
								{"Le développement web"}
							</h3>

							<div className={"homepage__text"}>
								<p className={"homepage__paragraph"}>{"Je suis arrivé dans le domaine du web un peu par hasard, et de fil en aiguille, j'ai été captivé. Mon apprentissage a commencé en tant qu'auto-didacte, internet étant une formidable source de tutoriels. Par la suite, j'ai tenu à officialiser mes acquis avec des formations. Aujourd'hui, je suis heureux d'avoir pu en faire mon métier."}</p>
								<p className={"homepage__paragraph"}>{"Vers la fin de ma formation, l'idée de me créer un petit site personnel s'est imposée. L'objectif était multiple : mettre en pratique les connaissances apprises, me présenter, et montrer les fruits de mon intérêt pour la photographie."}</p>
								<p className={"homepage__paragraph"}>{"Bien que touche-à-tout avec les technologies du web, j'affectionne particulièrement le fait de développer ma créativité pour construire des designs, rédiger des lignes de code, admirer leur logique, et les voir prendre vie dans le navigateur. Réfléchir aux couleurs à utiliser, à la disposition des différents éléments, aux formes, à l'expérience utilisateur, sont autant de problématiques que j'apprécie de résoudre soigneusement."}</p>
							</div>
						</div>

						<div className={"homepage__section"}>
							<h3
								className={"homepage__title"}
								data-title={"La photographie"}
							>
								{"La photographie"}
							</h3>

							<div className={"homepage__text"}>
								<p className={"homepage__paragraph"}>{"De la même manière qu'avec le web, je me suis intéressé à la photographie et en ait acquis les bases par moi-même. Ce qui me plait, c'est d'immortaliser l'instant, montrer la beauté dans des choses ordinaires. La nature sous toutes ses formes, les architectures, et les photos rapprochées sont les types de sujets qui m'inspirent le plus."}</p>
								<p className={"homepage__paragraph"}>{"Durant mon temps libre, je prends plaisir à faire du vélo, jouer aux jeux vidéo, lire, ou tout simplement me balader entre-autres."}</p>
							</div>
						</div>
					</div>
				</div>

				<div className={"homepage__portrait"}>
					<SVGPortrait />
				</div>
			</main>

			<Footer
				// applyHideClass={applyHideClass}
				// revealOnScroll={revealOnScroll}
			/>
		</div>
	);
}

export default HomePage;
