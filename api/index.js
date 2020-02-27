const express = require('express');
const { Router } = express;
const api = new Router()

api.get('/', (req, res) => {
	res.json({
		up: true,
		time: new Date().getTime(),
		identity: '/identity'
	})
})

api.use('/identity', require('./identity.js'))

module.exports = api;