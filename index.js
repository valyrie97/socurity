const express = require('express');
const app = express();
const api = require('./api');
const NodeRSA = require('node-rsa');
const rsa = new NodeRSA();
const fs = require('fs');
const nedb = require('nedb');
const identities = new nedb({
	filename: 'identities.nedb',
	autoload: true
});

app.use('/api	', api);
app.listen(6565);

function createIdentity(name) {
	const pair = rsa.generateKeyPair()

	identities.insert({
		name,
		type: 'public',
		key: pair.exportKey('pkcs1-public-pem')
	});
	identities.insert({
		name,
		type: 'private',
		key: pair.exportKey('pkcs1-private-pem')
	});
}

module.exports = {
	createIdentity
}
