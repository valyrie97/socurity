const express = require('express');
const { Router } = express;
const router = new Router()
const identity = require('../src/identity.js')

router.get('/', async (req, res) => {
	res.json({
		identities: await identity.get.all()
	});
});

router.get('/:guid', (req, res) => {
	console.log(req.param.guid);
	res.json({});
})

module.exports = router;