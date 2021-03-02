/* 
📢 This file contains the setup function that is called when 
server is run locally to use development databases. This 
function is called again when tests are ran to change from 
development to test databases.
*/

const readData = require('./readData');
const writeData = require('./writeData');
const secret = require('./secrets');

const setup = (val) => {
	if (val === 'test') {
		writeData.setPath(secret.customersTestDB, secret.orderTestDB);
		readData.setPath(secret.customersTestDB, secret.orderTestDB);
	} else {
		writeData.setPath(secret.customersDB, secret.ordersDB);
		readData.setPath(secret.customersDB, secret.ordersDB);
	}
};

exports.configure = setup;
