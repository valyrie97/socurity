const NodeRSA = require('node-rsa');
const nedb = require('nedb');
const identities = new nedb({
	filename: 'identities.nedb',
	autoload: true
});

async function createIdentity(name) {
	const rsa = new NodeRSA();
	const pair = rsa.generateKeyPair()

	await new Promise(res => {
		identities.insert({
			name,
			public: pair.exportKey('pkcs1-public-pem'),
			private: pair.exportKey('pkcs1-private-pem')
		}, res);
	});
}

async function getIdentity(uid) {
	return await new Promise((res, rej) => {
		identities.findOne({
			_id: uid
		}, (err, doc) => {
			if(err || !doc) return rej(err);
			delete doc.private;
			res(doc);
		})
	});
}

async function getAllIdentities() {
	return await new Promise(res => {
		identities.find({}, (err, docs) => {
			const names = docs.reduce((acc, obj) => {
				if(obj._id in acc) return acc;
				acc[obj._id] = obj.name;
				return acc;
			}, {});
			res(names);
		})
	});
}

async function getPrivateKey(uid) {
	return await new Promise((res, rej) => {
		identities.findOne({
			_id: uid
		}, (err, doc) => {
			if(err || !doc) return rej(err);
			res(doc.private);
		})
	});
}

async function getPublicKey(uid) {
	return await new Promise((res, rej) => {
		identities.findOne({
			_id: uid
		}, (err, doc) => {
			if(err || !doc) return rej(err);
			res(doc.public);
		})
	});
}

async function encryptWithPrivate(uid, data) {
	const cipher = new NodeRSA();
	cipher.importKey(await getPrivateKey(uid));
	return cipher.encryptPrivate(data, 'base64');
}

async function decryptWithPublic(uid, data) {
	const cipher = new NodeRSA();
	cipher.importKey(await getPublicKey(uid));
	return cipher.decryptPublic(data, 'ascii');
}

module.exports = {
	create: createIdentity,
	get: Object.assign(getIdentity, {
		all: getAllIdentities
	}),
	encrypt: {
		with: {
			private: encryptWithPrivate
		}
	},
	decrypt: {
		with: {
			public: decryptWithPublic
		}
	}
};

(async function() {
	if(Object.keys(await getAllIdentities()).length === 0) {
		createIdentity('Default');
	}
})();