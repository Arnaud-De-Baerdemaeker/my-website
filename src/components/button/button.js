// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

const Button = ({buttonId, buttonRef, buttonPhotosetId, buttonCurrentPage, buttonAction, buttonClass, children}) => {
	return (
		<button
			type={"button"}
			id={buttonId}
			ref={buttonRef}
			data-photoset-id={buttonPhotosetId}
			data-current-page={buttonCurrentPage}
			onClick={buttonAction}
			className={buttonClass}
		>
			{children}
		</button>
	);
}

export default Button;