// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component, createRef} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import HomePage from "./pages/homepage/homepage";
import Gallery from "./pages/galleryPage/gallery";
import Portfolio from "./pages/portfolio/portfolio";
import Error404 from "./pages/error404/error404";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMenuOpen: false
		};
		this.elements = null;

		this.headerRef = createRef();

		this.setTabTitle = this.setTabTitle.bind(this);
		this.backToTop = this.backToTop.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.applyHideClass = this.applyHideClass.bind(this);
		this.revealOnScroll = this.revealOnScroll.bind(this);
	}

	setTabTitle(title) {
		document.title = title;
	}

	backToTop() {
		if (window.scrollY !== 0) {
			window.scrollTo(0, 0);
		}
	}

	toggleMenu() {
		this.setState(state => ({
			isMenuOpen: !state.isMenuOpen
		}));
	}

	closeMenu() {
		if(this.state.isMenuOpen === true) {
			this.setState({
				isMenuOpen: false
			});
		}
	}

	applyHideClass(elements) {
		elements.forEach(element => {
			element.classList.add("view--hidden");
		});
	}

	revealOnScroll(elements) {
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

	render() {
		return (
			<BrowserRouter>
				<Routes>
					<Route
						path={"/galerie"}
						element={
							<Gallery
								isMenuOpen={this.state.isMenuOpen}
								headerRef={this.headerRef}
								setTabTitle={this.setTabTitle}
								backToTop={this.backToTop}
								toggleMenu={this.toggleMenu}
								closeMenu={this.closeMenu}
								applyHideClass={this.applyHideClass}
								revealOnScroll={this.revealOnScroll}
							/>
						}
					/>
					<Route
						path={"/portfolio"}
						element={
							<Portfolio
								isMenuOpen={this.state.isMenuOpen}
								headerRef={this.headerRef}
								setTabTitle={this.setTabTitle}
								backToTop={this.backToTop}
								toggleMenu={this.toggleMenu}
								closeMenu={this.closeMenu}
								applyHideClass={this.applyHideClass}
								revealOnScroll={this.revealOnScroll}
							/>
						}
					/>
					<Route
						path={"/"}
						element={
							<HomePage
								isMenuOpen={this.state.isMenuOpen}
								headerRef={this.headerRef}
								setTabTitle={this.setTabTitle}
								backToTop={this.backToTop}
								toggleMenu={this.toggleMenu}
								closeMenu={this.closeMenu}
								applyHideClass={this.applyHideClass}
								revealOnScroll={this.revealOnScroll}
							/>
						}
					/>
					<Route
						path="*"
						element={
							<Error404
								isMenuOpen={this.state.isMenuOpen}
								headerRef={this.headerRef}
								setTabTitle={this.setTabTitle}
								toggleMenu={this.toggleMenu}
								closeMenu={this.closeMenu}
								applyHideClass={this.applyHideClass}
								revealOnScroll={this.revealOnScroll}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		);
	}
}

export default App;