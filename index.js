const express = require('express');
const app = express();
const api = require('./api');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/api', api);
app.listen(6565);
