// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

const SVG = ({svgViewBox, svgClass, children}) => {
	return (
		<svg
			viewBox={svgViewBox}
			xmlns={"http://www.w3.org/2000/svg"}
			xmlnsXlink={"http://www.w3.org/1999/xlink"}
			className={svgClass}
		>
			{children}
		</svg>
	);
}

export default SVG;