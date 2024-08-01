import {createFlickr} from "flickr-sdk";

module.exports.handler = async () => {
	const {flickr} = createFlickr(process.env.REACT_APP_API_KEY);

	try {
		const request = await flickr("flickr.photosets.getPhotos", {
			photoset_id: "72177720303779286",
			extras: "url_c, geo"
		});

		return {
			statusCode: 200,
			body: JSON.stringify(request)
		}
	}
	catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify(error)
		}
	}
}
