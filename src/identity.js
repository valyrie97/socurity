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

module.exports = {
	create: createIdentity,
	get: Object.assign(getIdentity, {
		all: getAllIdentities
	})
};

(async function() {
	if(Object.keys(await getAllIdentities()).length === 0) {
		createIdentity('Default');
	}
})();