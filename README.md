# Socurity

Socurity is a PKI approach to SSO. It utilizes a local Identity server for storing keypairs, and a chrome/firefox extension to facilitate communication and provide a front end with/for said server.

This is mostly academic in nature, but serves to prove that very basic PKI can be used in place of traditional username/password as an account model.

## Extension

the `/extension` folder is the root of the unpacked extension.

### Installation
- navigate to `edge://extensions` or `chrome://extensions`
- check developer mode is turned on
- select `load unpacked extension`
- select the `/extension` folder in this repo.

## Identity Server

The identity server stores all of your keypairs. The api can be found in [api](/api/.README.md)

### Starting the server

```
yarn start
```

## Test Website

Included in this repo is a mock website to exhibit Socurity's functionality and facilitate development.

### Starting the mock site

```
yarn serve -l 8080 test
```