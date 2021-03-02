/*
📢 This file contains the asynchronous functions that are 
reading 📖 data from the DB. 
*/

const fs = require('fs');

var customerDB;
var orderDB;

/* 
📢 This function will be called in setup.js to change path
from development database to test database when tests are 
ran
*/

function setPath(val1, val2) {
	customerDB = val1;
	orderDB = val2;
}

const readDB = {
	/* 📖 Reading from the customers DB */
	async readCustomersDB() {
		try {
			return await fs.readFileSync(customerDB, 'utf8');
		} catch (error) {
			return error;
		}
	},
	/* 📖 Reading from the orders DB */
	async readOrdersDB() {
		try {
			return await fs.readFileSync(orderDB, 'utf8');
		} catch (error) {
			return error;
		}
	},
};

module.exports = { readDB, setPath };
