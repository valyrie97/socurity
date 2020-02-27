const NodeRSA = require('node-rsa');
const nedb = require('nedb');
const rsa = new NodeRSA();
const identities = new nedb({
	filename: 'identities.nedb',
	autoload: true
});

async function createIdentity(name) {
	const pair = rsa.generateKeyPair()

	await new Promise(res => {
		identities.insert({
			name,
			type: 'public',
			key: pair.exportKey('pkcs1-public-pem')
		}, res);
	})
	await new Promise(res => {
		identities.insert({
			name,
			type: 'private',
			key: pair.exportKey('pkcs1-private-pem')
		}, res);
	});
}

async function getIdentity() {
	
}

async function getAllIdentities() {
	return await new Promise(res => {
		identities.find({}, (err, docs) => {
			const names = docs.reduce((acc, obj) => {
				if(obj._id in acc) return acc;
				else acc[obj._id] = obj.name;
			}, {});
			res(names);
		})
	});
}

module.exports = {
	create: createIdentity,
	get: Object.assign(getIdentity, {
		all: getAllIdentities
	})
}