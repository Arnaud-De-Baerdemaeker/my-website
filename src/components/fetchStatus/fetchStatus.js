// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

import React, {Component} from "react";

import SVG from "../svg/svg";

class FetchError extends Component {
	render() {
		if(this.props.id === "fetchError") {
			return(
				<div className={"fetchStatus"}>
					<div className={"fetchStatus__icon"}>
						<SVG id={"fetchErrorIcon"} />
					</div>
					<p className={"fetchStatus__message"}>
						{"Un problème est survenu durant le traitement de la requête."}
						<br />
						{"Les photos ne peuvent pas être récupérées pour le moment."}
					</p>
				</div>
			);
		}
		else if(this.props.id === "fetchLoading") {
			return(
				<div className={"fetchStatus"}>
					<div className={"fetchStatus__icon"}>
						<SVG id={"fetchLoadingIcon"} />
					</div>
					<p className={"fetchStatus__message"}>
						{"Chargement en cours..."}
					</p>
				</div>
			);
		}
	}
}

export default FetchError;
