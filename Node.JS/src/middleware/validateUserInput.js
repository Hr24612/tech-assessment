/* 
📜 "True Cyber Security is preparing for what is
next, not what was last" - Neil Rerup 

📢 This file contains functions that are responsible 
for carrying out input validation on different API
endpoints. Each fail validation returns the response 
which prevents other statements from happening. When 
all validation are passed, the next() function kicks 
in which finally allows the controllers to do work 
with the user data.  
*/

const validateUserInput = {
	/* 🔒 Validates customer information when adding a new customer entry to the DB */
	validateCustomerInformation(request, response, next) {
		const {
			firstName,
			lastName,
			age,
			address,
			phoneNumber,
		} = request.body.customer;

		if (!firstName || !lastName || !age || !address || !phoneNumber) {
			return response.status(422).json({
				message:
					'Please fill out the require fields: firstName, lastName, age, address, and phoneNumber',
			});
		}
		if (
			typeof firstName !== 'string' ||
			typeof lastName !== 'string' ||
			typeof address !== 'string' ||
			typeof age !== 'number' ||
			typeof phoneNumber !== 'number'
		) {
			return response.status(422).json({
				message:
					'Unsupported type, please ensure firstName, lastName and address are of type string and phoneNumber and age are of type number',
			});
		}
		if (
			!/^[a-zA-Z]{2,30}/.test(firstName) ||
			!/^[a-zA-Z]{2,30}/.test(lastName)
		) {
			return response.status(406).json({
				message:
					'First name and last name needs to be alpha-numeric and between 2-30 characters long',
			});
		}
		if (!/^\s*-?[0-9]{1,3}\s*$/.test(age)) {
			return response.status(406).json({
				message: 'Age must be numeric and between 1-3 characters long',
			});
		}
		if (!/^[a-zA-Z0-9\s,'-]*$/.test(address)) {
			return response.status(406).json({
				message:
					'Address needs to be alpha numeric between 6-60 characters long with -,_ as acceptable special characters',
			});
		}
		if (!/^\s*-?[0-9]{11}\s*$/.test(phoneNumber)) {
			return response.status(406).json({
				message:
					'Phone number must be numeric only and needs to be exactly 11 characters long',
			});
		}

		next();
	},

	/* 🔒 Validates order information when adding a new order entry to the DB */
	validateOrderInformation(request, response, next) {
		const { customerID, type, items, total_items, cost } = request.body.order;

		if (!customerID || !type || !items || !total_items || !cost) {
			return response.status(422).json({
				message:
					'Please fill out the require fields: customerID, type, items, total_items, and cost',
			});
		}
		if (
			typeof customerID !== 'string' ||
			typeof type !== 'string' ||
			typeof items !== 'object' ||
			typeof total_items !== 'number' ||
			typeof cost !== 'string'
		) {
			return response.status(422).json({
				message:
					'Unsupported type, please ensure customerID, type and cost are of type string. total_items is of type number, and items is of type array',
			});
		}
		if (
			!/\b[a-f0-9]{8}\b-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-\b[a-f0-9]{12}\b/.test(
				customerID
			)
		) {
			return response.status(406).json({
				message: 'Customer ID is not valid',
			});
		}
		if (!/^[a-zA-Z]{3,30}$/.test(type)) {
			return response.status(406).json({
				message: 'Type must be string value and between 3-30 characters long',
			});
		}

		items.forEach((item) => {
			if (!/^[a-zA-Z]{3,30}$/.test(item)) {
				return response.status(406).json({
					message:
						'Array elements must be stirng only and between 3-30 characters long',
				});
			}
		});
		if (!/^\s*-?[0-9]{0,9}\s*$/.test(total_items)) {
			return response.status(406).json({
				message: 'Total items must be numeric and between 0-9 characters long',
			});
		}
		if (!/[(0-9)+.?(0-9)*]+/.test(cost)) {
			return response.status(406).json({
				message: 'Cost must be string',
			});
		}
		next();
	},

	/* 🔒 Validates customer ID when requesting orders by a customer */
	validateCustomerID(request, response, next) {
		const { customerID } = request.body.order;

		if (!customerID) {
			return response.status(422).json({
				message: 'Please provide a customer ID',
			});
		}
		if (typeof customerID !== 'string') {
			return response.status(406).json({
				message: 'Customer ID must be a string',
			});
		}
		if (
			!/\b[a-f0-9]{8}\b-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-\b[a-f0-9]{12}\b/.test(
				customerID
			)
		) {
			return response.status(406).json({
				message: 'Customer ID is not valid',
			});
		}

		next();
	},

	/* 🔒 Validates order ID when deleting order by a order ID */
	validateOrderID(request, response, next) {
		const { orderID } = request.body.order;

		if (!orderID) {
			return response.status(422).json({
				message: 'Please provide a order ID',
			});
		}
		if (typeof orderID !== 'string') {
			return response.status(406).json({
				message: 'Orer ID must be a string',
			});
		}
		if (
			!/\b[a-f0-9]{8}\b-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-\b[a-f0-9]{12}\b/.test(
				orderID
			)
		) {
			return response.status(406).json({
				message: 'Order ID is not valid',
			});
		}
		next();
	},
};

module.exports = validateUserInput;
