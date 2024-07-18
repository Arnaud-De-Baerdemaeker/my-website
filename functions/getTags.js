const axios = require("axios");

const handler = async (event) => {
	try {
		const request = await axios({
			method: "GET",
			url: "https://www.flickr.com/services/rest/?method=flickr.tags.getListPhoto",
			headers: {
				"Content-Type": "application/json"
			},
			params: {
				api_key: process.env.REACT_APP_API_KEY,
				photo_id: event.queryStringParameters.photo_id,
				format: "json",
				nojsoncallback: 1,
			}
		});

		return {
			statusCode: 200,
			body: JSON.stringify(request.data)
		}
	}
	catch (error) {
		return {
			statusCode: 500,
			body: error.toString()
		}
	}
}

module.exports = {handler}
