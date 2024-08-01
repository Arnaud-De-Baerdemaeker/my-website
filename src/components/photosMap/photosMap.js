import React, {Component} from "react";
import L from "leaflet";

class PhotosMap extends Component {
	constructor(props) {
		super(props);
		this.map = null;

		this.initializeMap = this.initializeMap.bind(this);
	}

	initializeMap() {
		const map = L.map("photosMap", {
			center: [50.4629, 4.5817],
			zoom: 8,
			maxZoom: 18,
			minZoom: 1
		});
		const layer = L.tileLayer("http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png", {
			maxZoom: 18,
			detectRetina: true
		});

		layer.addTo(map);
	}

	componentDidMount() {
		this.initializeMap();
	}

	render() {
		return (
			<div
				id={"photosMap"}
				className={"photosMap"}
			></div>
		);
	}
}

export default PhotosMap;
