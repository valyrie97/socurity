const express = require('express');
const { Router } = express;
const router = new Router()

router.get('/:guid', (req, res) => {
	console.log(req);
})

module.exports = router;