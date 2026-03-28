// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import {createFlickr} from "flickr-sdk";

import {useState, useEffect, useRef} from "react";

import Header from "../../components/header/header";
import Hero from "../../components/hero/hero";
import SVGGalleryHero from "../../components/svg/svgGalleryHero";
import MainTitle from "../../components/mainTitle/mainTitle";
import Button from "../../components/button/button";
import FetchStatus from "../../components/fetchStatus/fetchStatus";
import Card from "../../components/card/card";
import Modal from "../../components/modal/modal";
import Footer from "../../components/footer/footer";

const Gallery = ({isMenuOpen, headerRef, setDocumentTitle, setScrollToTop, toggleMenu, closeMenu, applyHideClass, revealOnScroll}) => {
	const [activeTab, setActiveTab] = useState({
		name: "traditional",
		id: "72177720303779286"
	});
	const [photos, setPhotos] = useState({
		page: 1,
		pages: null,
		total: null,
		set: null
	});
	const [firstLoad, setFirstLoad] = useState(true);
	const [fetchLoading, setFetchLoading] = useState(true);
	const [fetchFailed, setFetchFailed] = useState(false);
	// const [bigPicture, setBigPicture] = useState(null);
	// const [modalOpen, setModalOpen] = useState(false);

	// const body = document.querySelector("body");
	const documentTitle = "Galerie | Arnaud De Baerdemaeker";
	// let photos = null;
	// let tags = null;
	// let timeout = null;
	const switchesRef = useRef();
	const loadMoreButtonRef = useRef();

	const getPhotos = async (photoset_id, page) => {
		fetchFailed === true ?? setFetchFailed(false);

		const {flickr} = createFlickr(process.env.REACT_APP_API_KEY);

		try {
			const request = await flickr("flickr.photosets.getPhotos", {
				photoset_id: photoset_id,
				extras: "url_z",
				per_page: 12,
				page: page
			});

			if(firstLoad) {
				setPhotos({
					page: request.photoset.page,
					pages: request.photoset.pages,
					total: request.photoset.total,
					set: request.photoset.photo
				});
			}
			else {
				setPhotos(prevState => ({
					page: request.photoset.page,
					pages: request.photoset.pages,
					total: request.photoset.total,
					set: [...(prevState.set || []), ...request.photoset.photo]
				}));
			}

			setFetchLoading(false);

			console.log(photos)
		}
		catch (error) {
			console.log(error);

			setFetchFailed(true);
			setFetchLoading(false);
		}
	}

	const switchTab = (event) => {
		const targetTab = event.target;
		const tabName = targetTab.id;
		const tabPhotosetId = targetTab.getAttribute("data-photoset-id");

		setFirstLoad(true);
		setPhotos(prevState => ({
			...prevState,
			page: 1
		}));
		setActiveTab({
			name: tabName,
			id: tabPhotosetId
		});
		setFetchLoading(true);

		const previousActiveTab = switchesRef.current.querySelector(".button__switch.active");
		previousActiveTab.classList.remove("active");

		if(!targetTab.classList.contains("active")) {
			targetTab.classList.add("active");
		}
	}

	const loadMore = () => {
		const loadMoreButton = loadMoreButtonRef.current;
		const nextPage = parseInt(loadMoreButton.getAttribute("data-current-page")) + 1;

		// console.log(nextPage);

		setFetchLoading(true);
		getPhotos(activeTab.id, nextPage);
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
		setDocumentTitle(documentTitle);
		setScrollToTop();
	}, []);

	useEffect(() => {
		if(activeTab.name === "traditional") {
			getPhotos(activeTab.id, photos.page);
		}
		else if(activeTab.name === "virtual") {
			getPhotos(activeTab.id, photos.page);
		}

		setFirstLoad(false);

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
				<div ref={switchesRef} className={"gallery__buttonBackground"}>
					<Button
						buttonId={"traditional"}
						buttonPhotosetId={"72177720303779286"}
						buttonAction={switchTab}
						buttonClass={"button button__switch active"}
					>
						{"Traditionnelle"}
					</Button>

					<Button
						buttonId={"virtual"}
						buttonPhotosetId={"72177720318552607"}
						buttonAction={switchTab}
						buttonClass={"button button__switch"}
					>
						{"Virtuelle"}
					</Button>
				</div>

				<div className={"gallery__grid"}>
					{photos.set ? photos.set.map(photo => (
						<Card
							key={photo.id}
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

				{(photos.pages > 1 && photos.page < photos.pages) && (
					<div className={"gallery__buttonBackground"}>
						<Button
							buttonId={null}
							buttonRef={loadMoreButtonRef}
							buttonCurrentPage={photos.page}
							buttonAction={loadMore}
							buttonClass={"button button__loadMore"}
						>
							{"Charger plus"}
						</Button>
					</div>
				)}
			</main>

			<Footer
				// applyHideClass={applyHideClass}
				// revealOnScroll={revealOnScroll}
			/>
		</div>
	);
}

export default Gallery;
