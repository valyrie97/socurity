# Identity API

The root endpoint for the server is `/api` on port 6565. For a local machine that looks like `http://localhost:6565/api`

The use of HTTP here, is potentially concerning, however, SSL complications with localhost are the main bottleneck. As a precaution, the server will only accept connection from localhost (127.0.0.1). This should limit the range of potential attacks to malware already present on the machine. at which point, your keypairs are already at risk.

# Endpoints

## `GET` - `/identity` alias `/identities`

List all identities (an object keyed by the identity's Identifier, with friendly names as the values.)

### `200`

```json
{
	"identities": {
		"m3bpZMBdp5uea4r7": "Default"
	}
}
```

## `GET` - `/identity/:uid`

Retrieve data about a particular Identity with a given `uid`.

### `200`

```json
{
	"name": "Default",
	"public": "-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAlulSpSeS1vAjUwXgcSlj+J6ncHScwujPYMWi8cza5IfdI5Od2g4A\nlk48mOQXkQFeiftc2YEn298NnzVQIEjGZIgCH+59VGN8aCNvHosbgXxcUnivAjKl\ny5Kk7M9Q8+rh01nd0Vv+xv5yFVSDKbtfB6pSeGsFEfy2r1rieBCg6pno5Dib+8EQ\nA9zcrb+zlolOL8c/YSx+JXiT5LKd/7Vu4Pkw85kyMtfmxu/nujepqnjJPkYTAa6Q\nYGFdGubST6Kb7OGZlT23xJ0WAn26oYQZ93wCQAxWIchvSTAzaGSkqiXtZf3gxIEz\nqGads0PMIJcGvtX4Kbggfy354w1vhTRlJQIDAQAB\n-----END RSA PUBLIC KEY-----",
	"_id":"m3bpZMBdp5uea4r7"
}
```

## `POST` - `/encrypt/:uid`

Encrypt a string using the private key of a particular Identity with a given `uid`.

### `POST` Parameters

```
Content-Type: application/json
```
```json
{
	"data": "My String to Encrypt"
}
```

### `200`

```json
{
	"data": "someBase64ContentWithoutAnyPrefixOrSuffix"
}
```

## `POST` - `/decrypt/:uid`

Decrypt a string using the public key of a particular Identity with a given `uid`.

### `POST` Parameters

```
Content-Type: application/json
```
```json
{
	"data": "someBase64ContentWithoutAnyPrefixOrSuffix"
}
```

### `200`

```json
{
	"data": "My Original String"
}
```