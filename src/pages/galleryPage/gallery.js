// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";
import axios from "axios";

import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Hero from "../../components/hero/hero";
import SVG from "../../components/svg/svg";
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
		this.props.setTabTitle(this.tabTitle);

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
											: photo.id
										}
										cardClick={this.handleClick}
										cardContent={
											<img
												src={
													sessionStorage.getItem("photos")
													? photo.url_c
													: photo.url_c
												}
												alt={""}
												data-hd={
													sessionStorage.getItem("photos")
													? photo.url_o
													: photo.url_o
												}
												loading={"lazy"}
												className={"card__image"}
											/>
										}
										cardClass={"card--photo view--hidden"}
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
						? <FetchStatus
							svgClass={"svg__error"}
							svgPath={
								<path
									d={"M7.5 6C6 4.49998 4.5 6 6 7.5L16.5 18L6.00004 28.5C4.50003 30 6.00007 31.5 7.50006 30L18 19.5L28.5 30C30 31.5 31.5 30 30 28.5L19.5 18L30 7.5C31.5 5.99997 30 4.49998 28.5 5.99998L18 16.5L7.5 6Z"}
									className={"icon__error"}
								/>
							}
							message={<>
								{"Un problème est survenu durant le traitement de la requête."}
								<br />
								{"Les photos ne peuvent pas être récupérées pour le moment."}
							</>}
						/>
						: this.state.isFetchLoading
						? <FetchStatus
							svgClass={"svg__loading"}
							svgPath={
								<>
									<path
										d={"M18 28.5024C18 28.7772 17.777 29.0012 17.5025 28.9888C14.7661 28.865 12.1672 27.7235 10.2218 25.7782C8.15893 23.7153 7 20.9174 7 18C7 15.0826 8.15893 12.2847 10.2218 10.2218C12.1672 8.27649 14.7661 7.13503 17.5025 7.01124C17.777 6.99883 18 7.22279 18 7.49762V7.49762C18 7.77244 17.7771 7.99394 17.5026 8.00759C15.0303 8.13057 12.6842 9.16688 10.9256 10.9256C9.0493 12.8018 7.99523 15.3466 7.99523 18C7.99523 20.6534 9.0493 23.1982 10.9256 25.0744C12.6842 26.8331 15.0303 27.8694 17.5026 27.9924C17.7771 28.0061 18 28.2276 18 28.5024V28.5024Z"}
										className={"icon__loading--innerArc"}
									/>
									<path
										d={"M18 5.4875C18 5.21826 18.2183 4.99905 18.4874 5.00914C20.0283 5.06695 21.5479 5.3985 22.9749 5.98957C24.5521 6.64288 25.9852 7.60045 27.1924 8.80761C28.3996 10.0148 29.3571 11.4479 30.0104 13.0251C30.6637 14.6023 31 16.2928 31 18C31 19.7072 30.6637 21.3977 30.0104 22.9749C29.3571 24.5521 28.3995 25.9852 27.1924 27.1924C25.9852 28.3996 24.5521 29.3571 22.9749 30.0104C21.5479 30.6015 20.0283 30.9331 18.4874 30.9909C18.2183 31.001 18 30.7817 18 30.5125V30.5125C18 30.2433 18.2184 30.026 18.4874 30.0151C19.9002 29.9578 21.2931 29.6517 22.6018 29.1097C24.0607 28.5053 25.3863 27.6196 26.503 26.503C27.6196 25.3863 28.5053 24.0607 29.1097 22.6018C29.714 21.1428 30.025 19.5791 30.025 18C30.025 16.4209 29.714 14.8572 29.1097 13.3982C28.5053 11.9393 27.6196 10.6137 26.503 9.49704C25.3863 8.38042 24.0607 7.49466 22.6018 6.89035C21.2931 6.34828 19.9002 6.04219 18.4874 5.98488C18.2184 5.97397 18 5.75674 18 5.4875V5.4875Z"}
										className={"icon__loading--outerArc"}
									/>
								</>
							}
							message={"Chargement en cours..."}
						/>
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