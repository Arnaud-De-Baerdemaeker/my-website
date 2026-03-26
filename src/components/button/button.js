// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

const Button = ({buttonId, buttonAction, buttonClass, children}) => {
	return (
		<button
			type={"button"}
			id={buttonId}
			onClick={buttonAction}
			className={buttonClass}
		>
			{children}
		</button>
	);
}

export default Button;