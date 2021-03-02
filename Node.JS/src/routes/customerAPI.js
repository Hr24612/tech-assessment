/* 
📢 This file contains all the API routes for customers. 
Each API route uses a middleware that validates the 
user input as a security 👮 measure prior to being used 
by the controller files.
*/

const router = require('express').Router();
const customerController = require('../controllers/customerController');
const validateUserInput = require('../middleware/validateUserInput');

router.post(
	'/api/customer/add_customer',
	validateUserInput.validateCustomerInformation,
	customerController.addCustomer
);

module.exports = router;
