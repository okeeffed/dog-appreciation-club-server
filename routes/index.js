const Breeds = require('../controllers/breeds');
const Flickr = require('../controllers/flickr');

/* GET home page. */
module.exports = function(app) {
	app.get('/', function(req, res) {
		res.send('Server is healthy');
	});

	app.get('/api/v1/dog', function(req, res) {
		Breeds.fetchInfo()
		.then(result => {
			Flickr.retrieve(`${result.dog.name}`)
				.then(data => {
					result.photos = data.photos.photo;
					result.photos.map((photo, index) => {
						result.photos[index].url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
					});

					console.log(result);
					res.send(result);
				})
				.catch(err => {
					console.log(err.message);
					res.status(400).send('Failed');
				});
	})
	.catch(err => console.log(err.message));
	});

	app.post('/', function(req, res) {
		console.log(req.body);
		res.send('Post requests are healthy');
	});


}
