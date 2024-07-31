import {createFlickr} from "flickr-sdk";

module.exports.handler = async (event) => {
	const {flickr} = createFlickr(process.env.REACT_APP_API_KEY);

	try {
		const request = await flickr("flickr.photos.getSizes", {
			photo_id: event.queryStringParameters.photo_id
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
