const express = require('express');
const { Router } = express;
const api = new Router()

api.use('/identity', )

api.get('/', (req, res) => {
	res.json({
		up: true,
		time: new Date().getTime(),
		identities: [
			{
				name: 'example'
			}
		]
	})
})


module.exports = api;