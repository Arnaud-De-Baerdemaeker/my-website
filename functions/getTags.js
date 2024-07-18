import {createFlickr} from "flickr-sdk";

exports.handler = async (event) => {
	try {
		const {flickr} = createFlickr(process.env.REACT_APP_API_KEY);
		const request = await flickr("flickr.tags.getListPhoto", {
			photo_id: event.queryStringParameters.photo_id
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
