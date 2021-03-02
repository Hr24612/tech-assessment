/*
📢 This function depicts how a customer will be saved in the DB.
This function is called whenever a new entry is to be made 
in the DB or an existing entry is to be updated.
*/
const { v4: uuidv4 } = require('uuid');

const customerModel = (firstName, lastName, age, address, phoneNumber) => {
	return {
		firstName: firstName,
		lastName: lastName,
		age: age,
		address: address,
		phoneNumber: phoneNumber,
		date_created: new Date().toLocaleString(),
		customerID: uuidv4(),
	};
};

module.exports = customerModel;
