// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import {createFlickr} from "flickr-sdk";

import {useState, useEffect, useRef} from "react";

import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Hero from "../../components/hero/hero";
import SVGGalleryHero from "../../components/svg/svgGalleryHero";
import MainTitle from "../../components/mainTitle/mainTitle";
import Button from "../../components/button/button";
import SVG from "../../components/svg/svg";
import FetchStatus from "../../components/fetchStatus/fetchStatus";
import Card from "../../components/card/card";
import Modal from "../../components/modal/modal";
import Footer from "../../components/footer/footer";

const Gallery = ({isMenuOpen, headerRef, setTabTitle, backToTop, toggleMenu, closeMenu, applyHideClass, revealOnScroll}) => {
	const [activeTab, setActiveTab] = useState("traditional");
	const [photos, setPhotos] = useState(null);
	const [fetchLoading, setFetchLoading] = useState(true);
	const [fetchFailed, setFetchFailed] = useState(false);
	// const [bigPicture, setBigPicture] = useState(null);
	// const [modalOpen, setModalOpen] = useState(false);

	// const body = document.querySelector("body");
	const tabTitle = "Galerie | Arnaud De Baerdemaeker";
	// let photos = null;
	// let tags = null;
	// let timeout = null;
	const switchesRef = useRef();

	const switchTab = (event) => {
		console.log(event.target);

		const targetTab = event.target;

		setActiveTab(targetTab.name);

		const previousActiveTab = switchesRef.current.querySelector(".button__switch.active");
		previousActiveTab.classList.remove("active");

		if(!targetTab.classList.contains("active")) {
			targetTab.classList.add("active");
		}
	}

	const getPhotos = async (photoset_id) => {
		fetchFailed === true ?? setFetchFailed(false);

		const {flickr} = createFlickr(process.env.REACT_APP_API_KEY);

		try {
			const request = await flickr("flickr.photosets.getPhotos", {
				photoset_id: photoset_id,
				extras: "url_z",
				per_page: 12,
				page: 1
			});

			console.log(request);

			setPhotos(request.photoset.photo);
			setFetchLoading(false);
		}
		catch (error) {
			console.log(error);

			setFetchFailed(true);
			setFetchLoading(false);
		}
	}

	// const toggleModal = () => {
	// 	setIsModalOpen(!isModalOpen);

	// 	if(isModalOpen === true) {
	// 		body.classList.add("scrollBlocked");
	// 		headerRef.current.classList.remove("scroll");
	// 	}
	// 	else {
	// 		body.classList.remove("scrollBlocked");
	// 		headerRef.current.classList.add("scroll");

	// 		timeout = setTimeout(() => {
	// 			setHdPicture({
	// 				src: null,
	// 				alt: null
	// 			});
	// 		}, 800);
	// 	}
	// }

	// const handleClick = (click) => {
	// 	getDataFromTarget(click);
	// 	toggleModal();
	// }

	// const getDataFromTarget = (click) => {
	// 	setHdPicture({
	// 		src: click.target.dataset.hd,
	// 		alt: click.target.alt
	// 	});
	// }

	// const removeScrollLock = () => {
	// 	body.classList.remove("scrollBlocked");
	// 	headerRef.current.classList.add("scroll");
	// }

	useEffect(() => {
		// setTabTitle(tabTitle);
		// backToTop();

		console.log(switchesRef.current);

		if(activeTab === "traditional") {
			getPhotos(process.env.REACT_APP_TRADITIONAL_PHOTOSET_ID);
		}
		else if(activeTab === "virtual") {
			getPhotos(process.env.REACT_APP_VIRTUAL_PHOTOSET_ID);
		}

		console.log(photos);

		// return () => {
			// window.removeEventListener("scroll", () => {});
			// removeScrollLock();
			// clearTimeout(timeout);
		// };
	}, [activeTab]);

	// useEffect(() => {
	// 	const elementsToHide = document.querySelectorAll(".card--photo, .fetchStatus");

	// 	// Apply a class to initially hide the elements
	// 	applyHideClass(elementsToHide);

	// 	// Each time the user scrolls, the list of elements is refreshed and sent to a function
	// 	window.addEventListener("scroll", () => {
	// 		const elementsToReveal = elementsToHide;
	// 		revealOnScroll(elementsToReveal);
	// 	});
	// }, [photos]);

	return (
		<div className={"structure"}>
			<Header
				// isMenuOpen={isMenuOpen}
				headerRef={headerRef}
				// toggleMenu={toggleMenu}
				// closeMenu={closeMenu}
			/>

			<Hero scrollDown={true}>
				<MainTitle mainTitleClass={"mainTitle mainTitle--gallery mainTitle__title mainTitle__title--bold"}>
					Galerie
				</MainTitle>

				<div className={"hero__presentation"}>
					<p>Cette galerie rassemble une sélection de mes photographies et images virtuelles capturées de jeux vidéos.</p>
					<p>Le réel et le virtuel ici se côtoient avec toujours le même désir de capter la beauté d’un instant.</p>
				</div>

				<SVGGalleryHero />
			</Hero>

			<main className={"gallery container"}>
				<div ref={switchesRef} className={"gallery__switches"}>
					<Button
						buttonId={"traditional"}
						buttonAction={switchTab}
						buttonClass={"button button__switch active"}
					>
						{"Traditionnelle"}
					</Button>

					<Button
						buttonId={"virtual"}
						buttonAction={switchTab}
						buttonClass={"button button__switch"}
					>
						{"Virtuelle"}
					</Button>
				</div>

				<div className={"gallery__grid"}>
					{photos ? photos.map(photo => (
						<Card
							cardPhotoId={photo.id}
							cardPhotoUrl={photo.url_z}
							cardClass={"card"}
						/>
					)) : (
						<FetchStatus
							message={"Chargement des photos..."}
						/>
					)}
				</div>
			</main>

			<Footer
				// applyHideClass={applyHideClass}
				// revealOnScroll={revealOnScroll}
			/>
		</div>
	);
}

export default Gallery;
