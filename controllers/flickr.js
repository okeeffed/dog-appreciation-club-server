require('dotenv').config;
const Flickr = require("flickrapi");
const flickrOptions = {
	api_key: process.env.FLICKR_API_KEY,
	secret: process.env.FLICKR_API_SECRET
};

Flickr.authenticate(flickrOptions, (err, flickr) => {
	if (err) throw err;

	// we can now use "flickr" as our API object
	flickr.photos.search({
		user_id: flickr.options.user_id,
		page: 1,
		per_page: 20
	}, function(err, result) {
	// result is Flickr's response
	});
});
