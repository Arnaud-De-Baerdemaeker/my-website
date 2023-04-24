// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";
import axios from "axios";

import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Hero from "../../components/hero/hero";
import SVG from "../../components/svg/svg";
import FetchError from "../../components/fetchError/fetchError";
import Card from "../../components/card/card";
import Modal from "../../components/modal/modal";
import Footer from "../../components/footer/footer";

class Gallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			photos: null,
			hasFetchFailed: false,
			hdPicture: null,
			isModalOpen: false
		}
		this.body = document.querySelector("body");
		this.tabTitle = "Galerie | Arnaud De Baerdemaeker";
		this.photos = null;
		this.tags = null;
		this.timeout = null;

		this.getPhotos = this.getPhotos.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.getDataFromTarget = this.getDataFromTarget.bind(this);
		this.removeScrollLock = this.removeScrollLock.bind(this);
	}

	async getPhotos() {
		await axios({
			method: "GET",
			url: "https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos",
			headers: {
				"Content-Type": "application/json"
			},
			params: {
				api_key: process.env.REACT_APP_API_KEY,
				photoset_id: process.env.REACT_APP_PHOTOSET_ID,
				format: "json",
				nojsoncallback: 1,
				extras: "url_o, url_c",
			}
		})
		.then(results => {
			this.photos = results.data.photoset.photo;

			const promises = this.photos.map(async photo => {
				return await axios({
					method: "GET",
					url: "https://www.flickr.com/services/rest/?method=flickr.tags.getListPhoto",
					header: {
						"Content-Type": "application/json"
					},
					params: {
						api_key: process.env.REACT_APP_API_KEY,
						photo_id: photo.id,
						format: "json",
						nojsoncallback: 1,
					}
				});
			});

			Promise.all(promises)
			.then(results => {
				this.tags = results;

				let finalResult = [];

				this.photos.map(photo => {
					this.tags.find(tags => {
						if(tags.data.photo.id === photo.id) {
							finalResult.push({
								photo: {
									id: photo.id,
									url_c: photo.url_c,
									url_o: photo.url_o
								},
								tags: {
									subject: tags.data.photo.tags.tag.length === 3 ? tags.data.photo.tags.tag[0].raw : null,
									city: tags.data.photo.tags.tag.length === 3 ? tags.data.photo.tags.tag[1].raw : tags.data.photo.tags.tag[0].raw,
									country: tags.data.photo.tags.tag.length === 3 ? tags.data.photo.tags.tag[2].raw : tags.data.photo.tags.tag[1].raw
								}
							});
						}
					})
				});

				this.setState({
					photos: finalResult
				});

				const photos = [];
				this.state.photos.map(photo => {
					photos.push({
						id: photo.photo.id,
						url_c: photo.photo.url_c,
						url_o: photo.photo.url_o,
						tags: {
							subject: photo.tags.subject,
							city: photo.tags.city,
							country: photo.tags.country
						}
					});
				});

				sessionStorage.setItem("photos", JSON.stringify(photos));
			})
			.catch(() => {
				this.setState({
					hasFetchFailed: true
				});
			});
		})
		.catch(() => {
			this.setState({
				hasFetchFailed: true
			});
		});
	}

	toggleModal() {
		this.setState(({isModalOpen}) => ({
			isModalOpen: !isModalOpen
		}));

		if(!this.state.isModalOpen) {
			this.body.classList.add("scrollBlocked");
			this.props.headerRef.current.classList.remove("scroll");
		}
		else {
			this.body.classList.remove("scrollBlocked");
			this.props.headerRef.current.classList.add("scroll");
			this.timeout = setTimeout(() => {
				this.setState({
					hdPicture: null
				});
			}, 800);
		}
	}

	handleClick(click) {
		this.getDataFromTarget(click);
		this.toggleModal();
	}

	getDataFromTarget(click) {
		click.preventDefault();
		this.setState({
			hdPicture: click.target.dataset.hd
		});
	}

	removeScrollLock() {
		this.body.classList.remove("scrollBlocked");
		this.props.headerRef.current.classList.add("scroll");
	}

	componentDidMount() {
		this.props.setTabTitle(this.tabTitle);

		this.props.backToTop();

		// Check if the photos' data is stored in the session storage and load it instaed of making a new API call if so
		if(sessionStorage.getItem("photos")) {
			this.setState({
				photos: JSON.parse(sessionStorage.getItem("photos"))
			});
		}
		else {
			this.getPhotos();
		}
	}

	componentDidUpdate(prevState) {
		if(this.state.photos !== prevState.photos) {
			const elementsToHide = document.querySelectorAll(".card--photo, .fetchError");

			// Apply a class to initially hide the elements
			this.props.applyHideClass(elementsToHide);

			// Each time the user scrolls, the list of elements is refreshed and sent to a function
			window.addEventListener("scroll", () => {
				const elementsToReveal = elementsToHide;
				this.props.revealOnScroll(elementsToReveal);
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", () => {});
		this.removeScrollLock();
		clearTimeout(this.timeout);
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
					heroTitleClass={"hero__title--gallery"}
					heroTitleContent={"Galerie"}
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
				<main className={"gallery"}>
					{this.state.photos
						? <>
							<ul className={"gallery__list"}>
								{this.state.photos.map(photo =>
									<Card
										key={
											sessionStorage.getItem("photos")
											? photo.id
											: photo.photo.id
										}
										cardClick={this.handleClick}
										cardContent={
											<img
												src={
													sessionStorage.getItem("photos")
													? photo.url_c
													: photo.photo.url_c
												}
												alt={`${photo.tags.subject}, ${photo.tags.city} ${photo.tags.country}`}
												data-hd={
													sessionStorage.getItem("photos")
													? photo.url_o
													: photo.photo.url_o
												}
												loading={"lazy"}
												className={"card__image"}
											/>
										}
										cardClass={"card--photo view--hidden"}
										cardOverlayContent={
											<>
												<span className={"overlay__subject"}>{photo.tags.subject}</span>
												{" "}
												<span className={"overlay__city"}>{photo.tags.city}</span>
												{" "}
												<span className={"overlay__country"}>{photo.tags.country}</span>
											</>
										}
										cardOverlayTitleClass={"overlay__title--photo"}
									/>
								)}
							</ul>
							<Modal
								hd={this.state.hdPicture}
								isModalOpen={this.state.isModalOpen}
								toggleModal={this.toggleModal}
							/>
						</>
						: this.state.hasFetchFailed && <FetchError />
					}
				</main>
				<Footer
					applyHideClass={this.props.applyHideClass}
					revealOnScroll={this.props.revealOnScroll}
				/>
			</>
		);
	}
}

export default Gallery;