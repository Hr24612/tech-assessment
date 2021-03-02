/* 
📢 This file contains all the API routes for orders. 
Each API route uses a middleware that validates the 
user input as a security 👮 measure prior to being used 
by the controller files.
*/

const router = require('express').Router();
const orderController = require('../controllers/orderController');
const validateUserInput = require('../middleware/validateUserInput');

router.get('/api/order/get_all', orderController.getAll);

router.get(
	'/api/order/get_by_customer',
	validateUserInput.validateCustomerID,
	orderController.getByCustomer
);

router.post(
	'/api/order/create_order',
	validateUserInput.validateOrderInformation,
	orderController.createOrder
);

router.put(
	'/api/order/update_order',
	validateUserInput.validateOrderInformation,
	validateUserInput.validateOrderID,
	orderController.updateOrder
);

router.delete(
	'/api/order/delete_order',
	validateUserInput.validateOrderID,
	orderController.deleteOrder
);

module.exports = router;
