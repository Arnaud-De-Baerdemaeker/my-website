// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";

import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Hero from "../../components/hero/hero";
import SVG from "../../components/svg/svg";
import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";

import myWebsite from "../../images/myWebsite.png";
import smartmobiles from "../../images/smartmobiles.png";
import pomodoroTimer from "../../images/pomodoroTimer.png";
import solarSystem from "../../images/solarSystem.png";

class Portfolio extends Component {
	constructor(props) {
		super(props);
		this.tabTitle = "Portfolio | Arnaud De Baerdemaeker";
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
		this.props.setTabTitle(this.tabTitle);

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
					heroTitleClass={"hero__title--portfolio"}
					heroTitleContent={"Portfolio"}
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
				<main className={"portfolio"}>
					<ul className={"portfolio__list"}>
						{this.projects.map(project =>
							<Card
								key={project.title}
								cardContent={
									<a
										href={project.link && project.link}
										target={"_blank"}
										rel={"noreferrer noopener"}
										ref={this.imageRef}
										className={"card__link"}
									>
										<img
											src={project.image}
											alt={project.alt}
											className={"card__image"}
										/>
									</a>
								}
								cardClass={"card--project"}
								cardOverlayContent={project.title}
								cardOverlayTitleClass={"overlay__title--project"}
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
