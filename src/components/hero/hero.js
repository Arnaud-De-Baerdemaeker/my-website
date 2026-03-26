// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import ScrollDown from "../scrollDown/scrollDown";

const Hero = ({svgContent, scrollDown, children}) => {
	return (
		<div className={"hero"}>
			{children}

			{svgContent}

			{scrollDown ? <ScrollDown /> : null}
		</div>
	);
}

export default Hero;
