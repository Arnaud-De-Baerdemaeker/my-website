// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import {useEffect, useRef} from "react";

import SVGCard from "../svg/svgCard";
import CardOverlay from "../cardOverlay/cardOverlay";

const Card = ({cardClick, cardPhotoId, cardPhotoUrl, cardClass, cardContent, cardOverlayContent, cardOverlayTitleClass}) => {
	// const cardRef = useRef();
	// const overlayRef = useRef();

	// const hoveringIn = () => {
	// 	overlayRef.current.classList.replace("overlay--hidden", "overlay--visible");
	// }

	// const hoveringOut = () => {
	// 	overlayRef.current.classList.replace("overlay--visible", "overlay--hidden");
	// }

	// useEffect(() => {
	// 	if("ontouchstart" in window) {
	// 		overlayRef.current.classList.replace("overlay--hidden", "overlay--visible");
	// 	}
	// 	else {
	// 		cardRef.current.addEventListener("mouseover", hoveringIn);
	// 		cardRef.current.addEventListener("mouseout", hoveringOut);
	// 	}

	// 	return () => {
	// 		cardRef.current.removeEventListener("mouseover", hoveringIn);
	// 		cardRef.current.removeEventListener("mouseout", hoveringOut);
	// 	}
	// }, []);

	return (
		<figure
			// ref={cardRef}
			// onClick={cardClick}
			className={cardClass}
		>
			<SVGCard
				cardPhotoId={cardPhotoId}
				cardPhotoUrl={cardPhotoUrl}
			/>
		</figure>
	);
}

export default Card;
