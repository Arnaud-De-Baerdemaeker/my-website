// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import SVG from "../svg/svg";

const ScrollDown = ({}) => {
	return (
		<div className={"scrollDown"}>
			<SVG
				svgViewBox={"0 0 32 47"}
				svgClass={"scrollDown__svg"}
			>
				<path
					d={"M1 16L16 31L31 16"}
					className={"scrollDown__icon"}
				/>
				<path
					d={"M1 31L16 46L31 31"}
					className={"scrollDown__icon"}
				/>
				<path
					d={"M1 1L16 16L31 1"}
					className={"scrollDown__icon"}
				/>
			</SVG>
		</div>
	);
};

export default ScrollDown;
