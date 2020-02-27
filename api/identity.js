const express = require('express');
const { Router } = express;
const router = new Router()
const identity = require('../src/identity.js')

router.get('/', async (req, res) => {
	res.json({
		identities: await identity.get.all()
	});
});

router.get('/:uid', async (req, res) => {
	const uid = req.params.uid;
	const _return = await identity.get(uid);
	res.json(_return);
})

module.exports = router;
