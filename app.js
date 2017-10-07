const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = require('config').get('app.port');
const initControllers = require('./controllers');
const models = require('./models/mongo');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('models', models);

initControllers(app);

app.listen(port, console.log(`Server start on port ${port}. http://localhost:${port}`));

app.use((error, req, res, next) => {
    res.json({ error: error, message });
});