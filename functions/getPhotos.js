import {createFlickr} from "flickr-sdk";

module.exports.handler = async () => {
	const {flickr} = createFlickr(process.env.REACT_APP_API_KEY);

	try {
		const request = await flickr("flickr.photosets.getPhotos", {
			photoset_id: process.env.REACT_APP_PHOTOSET_ID,
			extras: "url_o, url_c"
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
