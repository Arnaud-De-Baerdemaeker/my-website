// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

const Button = ({buttonFunction, alt, buttonClass, children}) => {
	return (
		<button
			type={"button"}
			onClick={buttonFunction && buttonFunction}
			alt={alt}
			className={buttonClass}
		>
			{children}
		</button>
	);
}

export default Button;