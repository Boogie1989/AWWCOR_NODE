const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const config = require('config');
const port = config.get('app.port');
const initControllers = require('./controllers');
const models = require('./models/mongo');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('db.mongo.url'), { useMongoClient: true });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('models', models);

initControllers(app);

app.listen(port, console.log(`Server start on port ${port}`));