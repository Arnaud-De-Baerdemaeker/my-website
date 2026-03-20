// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import SVG from "../svg/svg";
import ScrollDown from "../scrollDown/scrollDown";

const Hero = ({svgViewBox, svgClass, svgContent, scrollDown, children}) => {
	return (
		<div className={"hero"}>
			{children}
			
			<SVG
				svgViewBox={svgViewBox}
				svgClass={svgClass}
			>
				{svgContent}
			</SVG>

			{scrollDown ? <ScrollDown /> : null}
		</div>
	);
}

export default Hero;
