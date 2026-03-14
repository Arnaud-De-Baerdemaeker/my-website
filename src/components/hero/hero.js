// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import {useEffect, useRef} from "react";

const Hero = ({heroContainerClass, heroTitleClass, heroTitleContent, heroBackToHomepage, scrollDownSVG}) => {
	const backgroundClasses = [
		"hero__background--1",
		"hero__background--2",
		"hero__background--3",
		"hero__background--4",
		"hero__background--5"
	];
	let index = 0;
	let lastIndex = null;
	let slideshow = null;
	const location = window.location.pathname;
	const heroContainerRef = useRef();
	const heroBackFilter = useRef();

	const scrollImages = () => {
		/*
			Interval to display the image in order by using an index matching the images in the array.
			At each iteration, the previous image is replaced with the next one.
			The condition checks if the end of the array is reached or not, and resets the counters to start over as a loop.
		*/
		if(location === "/" || location === "/galerie" || location === "/portfolio") {
			if(index === 4) {
				lastIndex = 4;
				index = -1;
			}
			else {
				lastIndex = index;
			}

			index++;
			heroContainerRef.current.classList.replace(backgroundClasses[lastIndex], backgroundClasses[index]);
		}
		else {
			return null;
		}
	}

	const handleHeroVisibility = () => {
		const viewport = window.innerHeight;
		const heroPosition = heroBackFilter.current.getBoundingClientRect().bottom;

		if(heroPosition < viewport / 2) {
			heroBackFilter.current.classList.add("hideHeroBackground");
		}
		else {
			heroBackFilter.current.classList.remove("hideHeroBackground");
		}
	}

	useEffect(() => {
		slideshow = window.setInterval(() => scrollImages(), 10000);
		window.addEventListener("scroll", handleHeroVisibility);

		return () => {
			clearInterval(slideshow);
			window.removeEventListener("scroll", handleHeroVisibility);
		}
	}, []);

	return (
		<div className={"hero"}>
			<div
				ref={heroContainerRef}
				className={"hero__container" + (
					heroContainerClass
					? heroContainerClass
					: ""
				)}
			>
				<div
					ref={heroBackFilter}
					className={"hero__backFilter"}
				></div>
			</div>
			<h2 className={heroTitleClass}>
				{heroTitleContent}
			</h2>
			{heroBackToHomepage ? heroBackToHomepage : null}
			{scrollDownSVG ? scrollDownSVG : null}
		</div>
	);
}

export default Hero;