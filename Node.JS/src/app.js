/* 🔧 Express.js setup */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

/* 🔧 API imports and setup */
const orderAPI = require('./routes/orderAPI');
const customerAPI = require('./routes/customerAPI');
app.use(orderAPI);
app.use(customerAPI);

/* 🔧 DB Setup for development */
const setDB = require('./config/setup');
setDB.configure('development');

/* ⚙️ Starting the server on localhost:PORT */
const { PORT } = require('./config/secrets');
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
