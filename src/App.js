// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import {useState, useRef, createContext} from "react";
import {BrowserRouter, Routes, Route} from "react-router";

import HomePage from "./pages/homepage/homepage";
import Gallery from "./pages/galleryPage/gallery";
import Portfolio from "./pages/portfolio/portfolio";
import Error404 from "./pages/error404/error404";

const App = () => {
	// let elements = null;
	const headerRef = useRef();

	const setTabTitle = (title) => {
		document.title = title;
	}

	const backToTop = () => {
		if (window.scrollY !== 0) {
			window.scrollTo(0, 0);
		}
	}

	const applyHideClass = (elements) => {
		elements.forEach(element => {
			element.classList.add("view--hidden");
		});
	}

	const revealOnScroll = (elements) => {
		// Recover the current viewport
		const viewport = window.innerHeight;

		elements.forEach(element => {
			// For each element, get its size and position coordinates
			const position = element.getBoundingClientRect();

			// Remove the hidden class when the element enters the viewport minus a definite length
			if(position.top <= (viewport - (position.height / 2))) {
				element.classList.replace("view--hidden", "view--visible");
			}
		});
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={"/galerie"}
					element={
						<Gallery
							headerRef={headerRef}
							setTabTitle={setTabTitle}
							backToTop={backToTop}
							applyHideClass={applyHideClass}
							revealOnScroll={revealOnScroll}
						/>
					}
				/>
				<Route
					path={"/portfolio"}
					element={
						<Portfolio
							headerRef={headerRef}
							setTabTitle={setTabTitle}
							backToTop={backToTop}
							applyHideClass={applyHideClass}
							revealOnScroll={revealOnScroll}
						/>
					}
				/>
				<Route
					path={"/"}
					element={
						<HomePage
							headerRef={headerRef}
							setTabTitle={setTabTitle}
							backToTop={backToTop}
							applyHideClass={applyHideClass}
							revealOnScroll={revealOnScroll}
						/>
					}
				/>
				<Route
					path="*"
					element={
						<Error404
							headerRef={headerRef}
							setTabTitle={setTabTitle}
							applyHideClass={applyHideClass}
							revealOnScroll={revealOnScroll}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;