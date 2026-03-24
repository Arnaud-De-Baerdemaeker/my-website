// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import {Link} from "react-router-dom";

import SVG from "../svg/svg";

const Name = ({nameClass, children}) => {
	return (
		<div className={`name ${nameClass}`}>
			{children}
		</div>
	);
}

export default Name;
