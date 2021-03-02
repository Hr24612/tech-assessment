/* 
📢 This file contains all the functions that will process the
data for customer API. 
*/
const { readDB } = require('../config/readData');
const { writeDB } = require('../config/writeData');
const customerModel = require('../models/customerModel');

const customerController = {
	/* 🔨 Adds a new customer to the DB*/
	addCustomer(request, response) {
		const {
			firstName,
			lastName,
			age,
			address,
			phoneNumber,
		} = request.body.customer;

		const customer = customerModel(
			firstName,
			lastName,
			age,
			address,
			phoneNumber
		);
		readDB
			.readCustomersDB()
			.then((DB) => {
				const data = JSON.parse(DB);
				data.customers.push(customer);
				const json = JSON.stringify(data);
				writeDB
					.writeCustomersDB(json)
					.then(() => {
						response.status(200).json({
							message: 'customer added into the DB successfully',
							customerID: customer.customerID,
						});
					})
					.catch((error) => {
						response.status(408).json({
							message: 'An unexpected error occured while saving to DB',
							error: error,
						});
					});
			})
			.catch((error) => {
				response.status(408).json({
					message: 'An unexpected error occured while reading the DB',
					error: error,
				});
			});
	},

	/* 
	⚠️ The following functions can be implemented similar to the ones 
	in orderController.js file but I am skipping them since they are 
	not required by the exercise. 
	*/

	getAllCustomers() {},
	deleteCustomer() {},
	updateCustomer() {},
};

module.exports = customerController;
