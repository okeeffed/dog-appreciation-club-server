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
			console.log(res);
			Flickr.retrieve(`${result.dog.name} puppy`)
				.then(data => {
					// console.log(util.inspect(data.photos.photo, {depth: null}));
					result.photos = data.photos.photo;
					console.log(result);
					res.send(result);
				})
				.catch(err => console.log(err));
	})
	.catch(err => console.log(err.message));
	});

	app.post('/', function(req, res) {
		console.log(req.body);
		res.send('Post requests are healthy');
	});


}
