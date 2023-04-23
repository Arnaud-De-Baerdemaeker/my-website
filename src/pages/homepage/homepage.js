// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";

import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Hero from "../../components/hero/hero";
import SVG from "../../components/svg/svg";
import Footer from "../../components/footer/footer";

import myPhoto from "../../images/moi.png";

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.tabTitle = "Accueil | Arnaud De Baerdemaeker";
	}

	componentDidMount() {
		this.props.setTabTitle(this.tabTitle);

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
					heroContainerClass={" hero__background--1"}
					heroTitleClass={"hero__title--homepage"}
					heroTitleContent={
						<>
							<span className={"title__jobPart1"}>{"Développeur "}</span>
							<span className={"title__jobPart2"}>{"web"}</span>
							<span className={"title__ampersand"}>{"&"}</span>
							<span className={"title__hobbyPart1"}>{"Amateur de "}</span>
							<span className={"title__hobbyPart2"}>{"photographie"}</span>
						</>
					}
					scrollDownSVG={
						<div className={"hero__scrollDown"}>
							<div className="hero__scrollDownContainer">
								<SVG
									viewBox={"0 0 36 36"}
									class={"svg__scrollDown"}
								>
									<g>
										<path
											d={"M6.20711 2.20711L17.2929 13.2929C17.6834 13.6834 18.3166 13.6834 18.7071 13.2929L29.7929 2.20711C30.1834 1.81658 30.1834 1.18342 29.7929 0.792893L29.7071 0.707107C29.3166 0.316582 28.6834 0.316583 28.2929 0.707107L18.7071 10.2929C18.3166 10.6834 17.6834 10.6834 17.2929 10.2929L7.70711 0.707107C7.31658 0.316583 6.68342 0.316583 6.29289 0.707107L6.20711 0.792893C5.81658 1.18342 5.81658 1.81658 6.20711 2.20711Z"}
											className={"icon__chevronTop"}
										/>
										<path
											d={"M17.2929 24.2929L6.20711 13.2071C5.81658 12.8166 5.81658 12.1834 6.20711 11.7929L6.29289 11.7071C6.68342 11.3166 7.31658 11.3166 7.70711 11.7071L17.2929 21.2929C17.6834 21.6834 18.3166 21.6834 18.7071 21.2929L28.2929 11.7071C28.6834 11.3166 29.3166 11.3166 29.7071 11.7071L29.7929 11.7929C30.1834 12.1834 30.1834 12.8166 29.7929 13.2071L18.7071 24.2929C18.3166 24.6834 17.6834 24.6834 17.2929 24.2929Z"}
											className={"icon__chevronMiddle"}
										/>
										<path
											d={"M29.7929 24.2071L18.7071 35.2929C18.3166 35.6834 17.6834 35.6834 17.2929 35.2929L6.20711 24.2071C5.81658 23.8166 5.81658 23.1834 6.20711 22.7929L6.29289 22.7071C6.68342 22.3166 7.31658 22.3166 7.70711 22.7071L17.2929 32.2929C17.6834 32.6834 18.3166 32.6834 18.7071 32.2929L28.2929 22.7071C28.6834 22.3166 29.3166 22.3166 29.7071 22.7071L29.7929 22.7929C30.1834 23.1834 30.1834 23.8166 29.7929 24.2071Z"}
											className={"icon__chevronBottom"}
										/>
									</g>
								</SVG>
							</div>
						</div>
					}
				/>
				<main className={"homepage"}>
					<div className={"homepage__myPhoto"}>
						<SVG
							viewBox={"0 0 300 300"}
							class={"svg__background"}
						>
							<path
								d={"M258 104C224.4 90.8 201.333 56.1667 194 40.5C167.5 -11.5 90 22.5 79.5 33C69 43.5 43 79.5 57.5 138C72 196.5 13 223.5 32 252C51 280.5 98.5 233 172.5 274.5C246.5 316 240.5 238 255.5 223.5C270.5 209 300 120.5 258 104Z"}
								className={"background3"}
							/>
							<path
								d={"M229.5 27.5C185.5 55.9 186 74.5 126.5 64C69 20.5 -17.5 126 45.5 136.5C69.2248 140.454 41.5 271.5 92 280.5C142.5 289.5 271.5 271.5 271 241.5C270.5 211.5 246.5 215 243.5 179.5C240.5 144 266 107 277 83C288 59 284.5 -7.99999 229.5 27.5Z"}
								className={"background2"}
							/>
							<g>
								<path
									d={"M286.5 127C285.3 122.2 282.722 119.153 278 118.5C273.535 117.882 263 120.5 262 125C261 129.5 270.167 128.667 273 130.5C276.833 133 282.1 139.1 284.5 137.5C287.5 135.5 288 133 286.5 127Z"}
									className={"background1"}
								/>
								<path
									d={"M54.9725 28.2945C50.9725 24.6945 35.5063 23.3772 31.9725 27.7945C25.9725 35.2945 34.8725 45.1945 42.4725 48.7945C50.0725 52.3945 57.561 47.8232 58.9725 44.2945C60.9725 39.2944 58.9725 31.8945 54.9725 28.2945Z"}
									className={"background1"}
								/>
							</g>
							<rect
								x={"75"}
								y={"75"}
								width={"150"}
								height={"150"}
								fill={"url(#pattern0)"}
							/>

							<defs>
								<pattern
									id={"pattern0"}
									patternContentUnits={"objectBoundingBox"}
									width={"1"}
									height={"1"}
								>
									<use
										xlinkHref={"#image0_64_2"}
										transform={"scale(0.000952381)"}
									/>
								</pattern>
								<image
									href={myPhoto}
									id={"image0_64_2"}
									width={"1050"}
									height={"1050"}
								/>
							</defs>
						</SVG>
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