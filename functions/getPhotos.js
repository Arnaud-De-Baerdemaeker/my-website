const axios = require("axios");

const handler = async (event) => {
	try {
		const request = await axios({
			method: "GET",
			url: `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos`,
			headers: {
				"Content-Type": "application/json"
			},
			params: {
				api_key: process.env.REACT_APP_API_KEY,
				photoset_id: process.env.REACT_APP_PHOTOSET_ID,
				format: "json",
				nojsoncallback: 1,
				extras: "url_o, url_c"
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
