// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";
import {Link} from "react-router-dom";

import SVG from "../svg/svg";

class Name extends Component {
	render() {
		if(this.props.id === "nameHeader") {
			return (
				<h1 className={"name--header"}>
					<Link
						to={"/"}
						onClick={this.props.closeMenu}
						className={"name__link"}
					>
						<div className="name__icon">
							<SVG id="logoIcon" />
						</div>

						<div className="name__text">
							{"Arnaud"}
							<br />
							{"De Baerdemaeker"}
						</div>
					</Link>
				</h1>
			);
		}
		else if(this.props.id === "nameFooter") {
			return (
				<h1 className={"name--footer"}>
					{"Arnaud"}
					<br />
					{"De Baerdemaeker"}
				</h1>
			);
		}
	}
}

export default Name;