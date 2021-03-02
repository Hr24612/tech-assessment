/* 
📢 This file contains sensitive data 🤫 for this app. In a 
real production environment, this information will be 
saved in environment valirables.
*/

const secrets = {
	PORT: process.env.PORT || 3000,
	customersDB: '../data/customers.json',
	customersTestDB: '../data/customers.test.json',
	ordersDB: '../data/orders.json',
	orderTestDB: '../data/orders.test.json',
};

module.exports = secrets;
