import {createFlickr} from "flickr-sdk";

exports.handler = async () => {
	try {
		const {flickr} = createFlickr(process.env.REACT_APP_API_KEY);
		const request = await flickr("flickr.photosets.getPhotos", {
			photoset_id: process.env.REACT_APP_PHOTOSET_ID,
			extras: "url_c, url_o"
		});

		return {
			statusCode: 200,
			body: JSON.stringify(request)
		}
	}
	catch(error) {
		return {
			statusCode: 500,
			body: JSON.stringify(error)
		}
	}
}
