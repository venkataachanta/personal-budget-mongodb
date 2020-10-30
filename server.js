const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

const newlocation = require('./manifest.json');

app.get('/budget', (req, res) => {
    res.json(newlocation);
});

app.listen(port, () => {
    console.log('API served at http://localhost:${port}');
});