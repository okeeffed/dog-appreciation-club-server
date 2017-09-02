var fs = require('fs');
var dotenv = require('dotenv');
var envConfig = dotenv.parse(fs.readFileSync('.env'));
for (var k in envConfig) {
	process.env[k] = envConfig[k]
}

// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const util = require('util');

// Routes Setup
const routes = require('./routes');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

const Breeds = require('./controllers/breeds');
const Flickr = require('./controllers/flickr');

Breeds.fetchInfo()
	.then(res => {
		console.log(res);
		Flickr.retrieve(res.dog.name)
			.then(res => console.log(util.inspect(res.photos.photo, {depth: null})))
			.catch(err => console.log(err));
	})
	.catch(err => console.log(err.message));

// Map routes to URL
routes(app);



// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
