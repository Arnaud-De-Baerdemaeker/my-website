// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import SVG from "../svg/svg";

const FetchError = ({svgClass, svgPath, message}) => {
	return (
		<div className={"fetchStatus"}>
			<div className={"fetchStatus__icon"}>
				<SVG
					viewBox={"0 0 36 36"}
					class={svgClass}
				>
					{svgPath}
				</SVG>
			</div>
			<p className={"fetchStatus__message"}>
				{message}
			</p>
		</div>
	);
}

export default FetchError;
