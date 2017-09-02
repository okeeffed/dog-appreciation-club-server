require('dotenv').config;
const Flickr = require("flickrapi");
const flickrOptions = {
	api_key: process.env.FLICKR_API_KEY,
	secret: process.env.FLICKR_API_SECRET
};

/**
 * Fetch images of a certain dog
 * @param  {String} dog The type of dog
 * @return {Object}     Return API results
 */
function retrieve(dog) {
	return new Promise((resolve, reject) => {
		Flickr.tokenOnly(flickrOptions, (err, flickr) => {
			if (err) throw err;
			// we can now use "flickr" as our API object
			flickr.photos.search({
				user_id: flickr.options.user_id,
				page: 1,
				per_page: 20,
				text: dog,
				sort: 'relevance',
				safe_search: 1,
				content_type: 1
			}, function(err, result) {
				// result is Flickr's response
				if (err) reject(err);

				resolve(result);
			});
		});
	});
}

module.exports = {
	retrieve
}
