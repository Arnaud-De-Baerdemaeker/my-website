// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";
import {Helmet} from "react-helmet-async";
import axios from "axios";

import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Hero from "../../components/hero/hero";
import FetchStatus from "../../components/fetchStatus/fetchStatus";
import Card from "../../components/card/card";
import Modal from "../../components/modal/modal";
import Footer from "../../components/footer/footer";

class Gallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			photos: null,
			isFetchLoading: false,
			hasFetchFailed: false,
			hdPicture: {
				src: null,
				alt: null
			},
			isModalOpen: false
		}
		this.body = document.querySelector("body");
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
		this.setState({
			isFetchLoading: true
		});

		await axios.get("/api/getPhotos")
		.then(results => {
			this.setState({
				photos: results.data.photoset.photo,
				isFetchLoading: false
			});

			sessionStorage.setItem("photos", JSON.stringify(results.data.photoset.photo));
		})
		.catch(error => {
			console.log(error);
			this.setState({
				isFetchLoading: false,
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
					hdPicture: {
						src: null,
						alt: null
					}
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
			hdPicture: {
				src: click.target.dataset.hd,
				alt: click.target.alt
			}
		});
	}

	removeScrollLock() {
		this.body.classList.remove("scrollBlocked");
		this.props.headerRef.current.classList.add("scroll");
	}

	componentDidMount() {
		this.props.backToTop();

		// Check if the photos' data is stored in the session storage and load it instead of making a new API call
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
			const elementsToHide = document.querySelectorAll(".card--photo, .fetchStatus");

			// Apply a class to initially hide the elements
			this.props.applyHideClass(elementsToHide);

			// Each time the user scrolls, the list of elements is refreshed and sent to a function
			window.addEventListener("scroll", () => {
				const elementsToReveal = elementsToHide;
				this.props.revealOnScroll(elementsToReveal);
			});
		}

		console.log(this.state.photos);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", () => {});
		this.removeScrollLock();
		clearTimeout(this.timeout);
	}

	render() {
		return(
			<>
				<Helmet>
					<meta name="description" content="La galerie de mon site. Découvrez les photos que j'ai prises." />
					<meta property="og:title" content="Galerie - Arnaud De Baerdemaeker" />
					<meta property="og:type" content="website" />
					<meta property="og:image" content="https://arnaud-de-baerdemaeker.netlify.app/src/images/opengraph/gallery_opengraph.png" />
					<meta property="og:image:width" content="500" />
					<meta property="og:image:height" content="265" />
					<meta property="og:image:type" content="image/png" />
					<meta property="og:url" content="https://arnaud-de-baerdemaeker.netlify.app/galerie" />
					<meta property="og:locale" content="fr_BE" />
					<title>Galerie - Arnaud De Baerdemaeker</title>
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
				<Hero id={"heroGallery"} />
				<main className={"gallery"}>
					{this.state.photos
						? <>
							<ul className={"gallery__list"}>
								{this.state.photos.map(photo =>
									<Card
										id={"cardPhotos"}
										key={
											sessionStorage.getItem("photos")
											? photo.id
											: photo.id
										}
										photo={photo}
										cardClick={this.handleClick}
									/>
								)}
							</ul>
							<Modal
								hd={this.state.hdPicture.src}
								imgAlt={this.state.hdPicture.alt}
								isModalOpen={this.state.isModalOpen}
								toggleModal={this.toggleModal}
							/>
						</>
						: this.state.hasFetchFailed
						? <FetchStatus id={"fetchError"} />
						: this.state.isFetchLoading
						? <FetchStatus id={"fetchLoading"} />
						: null
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