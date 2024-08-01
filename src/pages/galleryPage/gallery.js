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
import PhotosMap from "../../components/photosMap/photosMap";
import Card from "../../components/card/card";
import Modal from "../../components/modal/modal";
import Footer from "../../components/footer/footer";

class Gallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			photos: null,
			hdPicture: null,
			isFetchLoading: false,
			hasFetchFailed: false,
			isModalOpen: false
		}
		this.body = document.querySelector("body");
		this.timeout = null;

		this.getPhotos = this.getPhotos.bind(this);
		this.getOriginalSizePhoto = this.getOriginalSizePhoto.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.removeScrollLock = this.removeScrollLock.bind(this);
	}

	async getPhotos() {
		this.setState({
			isFetchLoading: true
		});

		await axios.get("/api/getPhotos")
		.then(results => {
			let photos = [];

			results.data.photoset.photo.forEach(result => {
				photos.push({
					id: result.id,
					url_c: result.url_c
				});
			});

			this.setState({
				photos: photos,
				isFetchLoading: false
			});

			sessionStorage.setItem("photos", JSON.stringify(photos));
		})
		.catch(() => {
			this.setState({
				isFetchLoading: false,
				hasFetchFailed: true
			});
		});
	}

	async getOriginalSizePhoto(photoId) {
		this.setState({
			isFetchLoading: true
		});

		await axios.get("/api/getOriginalSizePhoto", {
			params: {
				photo_id: photoId
			}
		})
		.then(results => {
			this.setState({
				hdPicture: results.data.sizes.size[12].source,
				isFetchLoading: false
			});

			let photos = JSON.parse(sessionStorage.getItem("photos"));

			photos.forEach((photo, index) => {
				if(photo.id === photoId) {
					photos[index].hdPhoto = results.data.sizes.size[12].source;
				}
			});

			sessionStorage.setItem("photos", JSON.stringify(photos));
		})
		.catch(() => {
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
					hdPicture: null
				});
			}, 800);
		}
	}

	handleClick(click) {
		this.setState({
			isFetchLoading: true
		});

		const photos = JSON.parse(sessionStorage.getItem("photos"));

		photos.forEach(photo => {
			if(photo.id === click.target.parentElement.attributes["dataphotoid"].value) {
				if(photo.hdPhoto) {
					this.setState({
						hdPicture: photo.hdPhoto,
						isFetchLoading: false
					});
				}
				else {
					this.getOriginalSizePhoto(photo.id);
				}
			}
		});

		this.toggleModal();
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
			const elementsToHide = document.querySelectorAll(".card--photo");

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
					<PhotosMap photos={this.state.photos} />
					{this.state.photos
						? <>
							<ul className={"gallery__list"}>
								{this.state.photos.map(photo =>
									<Card
										id={"cardPhotos"}
										key={photo.id}
										photo={photo}
										photoId={photo.id}
										cardClick={this.handleClick}
									/>
								)}
							</ul>
							<Modal
								hdPicture={this.state.hdPicture}
								isModalOpen={this.state.isModalOpen}
								toggleModal={this.toggleModal}
								isFetchLoading={this.state.isFetchLoading}
								hasFetchFailed={this.state.hasFetchFailed}
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