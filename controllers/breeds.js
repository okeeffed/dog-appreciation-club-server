require('dotenv').config;
const Xray = require('x-ray');
const util = require('util');

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

function fetchInfo() {
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
