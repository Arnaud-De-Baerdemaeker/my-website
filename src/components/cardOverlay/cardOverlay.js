// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

const CardOverlay = ({overlayRef, overlayTitleClass, overlayContent}) => {
	return (
		<div
			ref={overlayRef}
			className={"overlay--hidden"}
		>
			<h3 className={overlayTitleClass}>
				{overlayContent}
			</h3>
		</div>
	);
}

export default CardOverlay;
