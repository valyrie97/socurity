const express = require('express');
const { Router } = express;
const router = new Router()
const identity = require('../src/identity.js')

router.post('/:uid', async (req, res) => {
	const data = req.body.data || "";
	const uid = req.params.uid;
	res.json({
		data: await identity.encrypt.with.private(uid, data)
	});
});

module.exports = router;