// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

const Button = ({buttonFunction, buttonAlt, buttonClass, children}) => {
	return (
		<button
			type={"button"}
			onClick={buttonFunction && buttonFunction}
			alt={buttonAlt}
			className={buttonClass}
		>
			{children}
		</button>
	);
}

export default Button;