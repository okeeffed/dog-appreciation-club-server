require('dotenv').config;
const Xray = require('x-ray');
const util = require('util');

/**
 * Fetch the entire list of different breeds of dogs
 * @return {Object} Return the name of each breed and a link
 */
function fetchList() {
	const x = Xray();
	return new Promise((resolve, reject) => {
		x(process.env.BREEDS_URL, '.group', {
			breeds: x('.group-list-item', [
				{
					name: '.post-title',
					link: '.post-title@href'
				}
			])
		})((err, data) => {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
}

/**
 * Fetch data for a particular dog
 * @param  {String} dog URL for the dog data
 * @return {Object}     Return the info for the dog
 */
function fetch(dog) {
	const x = Xray();
	return new Promise((resolve, reject) => {
		x(dog.link, '.group', {
			dog: x('.breed-data-item-content', {
				info: ['p:first-child']
			})
		})((err, data) => {
			if (err) {
				reject(err);
			}
			data.dog.name = dog.name;
			data.dog.link = dog.link;
			resolve(data);
		});
	});
}

/**
 * Fetch the list of dogs, then randomly choose a dog
 * to return data about
 * @return {Object} Data and info about the one dog
 */
function fetchInfo() {
	/**
	 * Generate random int
	 * @param  {Number} min Minimum
	 * @param  {Number} max Maximum
	 * @return {Number}     Int between min and max
	 */
	function getRandomInteger(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	return new Promise((resolve, reject) => {
		fetchList()
		.then(data => {
			const random = getRandomInteger(0, data.breeds.length - 1);
			const dog = data.breeds[random];

			fetch(dog)
				.then(res => resolve(res))
				.catch(err => reject(err));
		})
		.catch(err => console.log(err.message));
	});
}

module.exports = {
	fetchList,
	fetch,
	fetchInfo
}
