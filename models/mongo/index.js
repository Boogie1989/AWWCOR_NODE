const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('db.mongo.url'), { useMongoClient: true });

module.exports = {
    Department: require('./department'),
    Employee: require('./employee'),
}