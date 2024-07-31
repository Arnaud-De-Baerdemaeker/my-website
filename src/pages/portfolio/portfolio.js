// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";
import {Helmet} from "react-helmet-async";

import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Hero from "../../components/hero/hero";
import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";

import myWebsite from "../../images/myWebsite.png";
import smartmobiles from "../../images/smartmobiles.png";
import pomodoroTimer from "../../images/pomodoroTimer.png";
import solarSystem from "../../images/solarSystem.png";

class Portfolio extends Component {
	constructor(props) {
		super(props);
		this.projects = [
			{
				title: "Mon site",
				image: myWebsite,
				alt: "Aperçu de mon site web personnel",
				link: null
			},
			{
				title: "Smartmobiles",
				image: smartmobiles,
				alt: "Aperçu de mon site web sur le référencement des appareils mobiles et leurs spécifications",
				link: "https://smartmobiles.netlify.app/"
			},
			{
				title: "Pomodoro Timer",
				image: pomodoroTimer,
				alt: "Aperçu de mon site web sur un minuteur pomodoro",
				link: "https://arnaud-pomodoro-timer.netlify.app/"
			},
			{
				title: "Le Système solaire",
				image: solarSystem,
				alt: "Aperçu de mon site web sur le Système solaire",
				link: "https://systemesolaire.netlify.app/index.html"
			}
		];
	}

	componentDidMount() {
		this.props.backToTop();

		const elementsToHide = document.querySelectorAll(".card--project");

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
		return(
			<>
				<Helmet>
					<meta name="description" content="Le portfolio de mon site. Découvrez les projets que j'ai développés." />
					<meta property="og:title" content="Portfolio - Arnaud De Baerdemaeker" />
					<meta property="og:type" content="website" />
					<meta property="og:image" content="https://arnaud-de-baerdemaeker.netlify.app/src/images/opengraph/portfolio_opengraph.png" />
					<meta property="og:image:width" content="500" />
					<meta property="og:image:height" content="265" />
					<meta property="og:image:type" content="image/png" />
					<meta property="og:url" content="https://arnaud-de-baerdemaeker.netlify.app/portfolio" />
					<meta property="og:locale" content="fr_BE" />
					<title>Portfolio - Arnaud De Baerdemaeker</title>
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
				<Hero id={"heroPortfolio"} />
				<main className={"portfolio"}>
					<ul className={"portfolio__list"}>
						{this.projects.map(project =>
							<Card
								id={"cardProjects"}
								key={project.title}
								project={project}
							/>
						)}
					</ul>
				</main>
				<Footer
					applyHideClass={this.props.applyHideClass}
					revealOnScroll={this.props.revealOnScroll}
				/>
			</>
		);
	}
}

export default Portfolio;
