/*
📢 This file contains the asynchronous functions that are 
writing ✍️ data to the DB. 
*/

const fs = require('fs');

var ordersDB;
var customersDB;

/* 
📢 This function will be called in setup.js to change path
from development database to test database when tests are 
ran
*/

function setPath(path1, path2) {
	customersDB = path1;
	ordersDB = path2;
}

const writeDB = {
	/* ✍️ Writing to the customers DB */
	async writeCustomersDB(JSON) {
		try {
			await fs.writeFileSync(customersDB, JSON, 'utf8');
		} catch (error) {
			return error;
		}
	},

	/* ✍️ Writing to the orders DB */
	async writeOrdersDB(JSON) {
		try {
			await fs.writeFileSync(ordersDB, JSON, 'utf8');
		} catch (error) {
			return error;
		}
	},
};

module.exports = { writeDB, setPath };
