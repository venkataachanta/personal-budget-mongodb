const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pbSchemaModel = require('./models/pb_schema');

const url = 'mongodb://localhost:27017/test';

const port = 3000;
app.use(bodyParser.json());

app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/hello', (req,res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            pbSchemaModel.find({})
                .then((data) => {
                    res.json(data);
                    mongoose.connection.close();
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });

});

app.post('/addBudget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        var addItem = ({
            title: req.body.title,
            budget: req.body.budget,
            backColor: req.body.backColor
        });

        pbSchemaModel.insertMany(addItem)
            .then((data) => {
                res.json(data);
                mongoose.connection.close();
            })
            .catch((error) => {
                console.log(error);
            });
    })
    .catch((error) => {
        console.log(error);
    });
});


app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});