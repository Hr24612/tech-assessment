/* 
📢 This file contains all the functions that will process the
data for each order API. 
*/

const { readDB } = require('../config/readData');
const { writeDB } = require('../config/writeData');
const orderModel = require('../models/orderModel');

const orderController = {
	/* ↪️ Returns all orders in the DB */
	getAll(request, response) {
		readDB
			.readOrdersDB()
			.then((DB) => {
				const data = JSON.parse(DB);
				response
					.status(200)
					.json({ message: 'Orderes successfully retrieved', payload: data });
			})
			.catch((error) => {
				response.status(408).json({
					message: 'An unexpected error occured while reading the DB',
					error: error,
				});
			});
	},

	/* ↪️ Returns all orders in the DB by a customer */
	getByCustomer(request, response) {
		const { customerID } = request.body.order;
		readDB
			.readOrdersDB()
			.then((orders) => {
				const data = JSON.parse(orders);
				var customerOrders = [];
				for (var i = 0; i < data.orders.length; i++) {
					if (data.orders[i].customerID === customerID) {
						customerOrders.push(data.orders[i]);
					}
				}
				if (customerOrders.length < 1) {
					response.status(404).json({
						message: 'No orders available with the provided customer ID',
					});
				} else {
					response.status(200).json({
						message: 'Customer orderes successfully retrieved',
						payload: customerOrders,
					});
				}
			})
			.catch((error) => {
				response.status(408).json({
					message: 'An unexpected error occured while reading the DB',
					error: error,
				});
			});
	},

	/* 🔨 Creates an order for a customer */
	createOrder(request, response) {
		const { customerID, type, items, total_items, cost } = request.body.order;

		const order = orderModel(customerID, type, items, total_items, cost);
		readDB
			.readOrdersDB()
			.then((DB) => {
				const data = JSON.parse(DB);
				data.orders.push(order);
				const json = JSON.stringify(data);
				writeDB
					.writeOrdersDB(json)
					.then(() => {
						response.status(200).json({
							message: 'Order placed successfully',
							orderID: order.orderID,
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

	/* 🩹 Updates an order in the DB */
	updateOrder(request, response) {
		const {
			customerID,
			type,
			items,
			total_items,
			cost,
			orderID,
		} = request.body.order;

		const updatedOrder = orderModel(customerID, type, items, total_items, cost);
		readDB
			.readOrdersDB()
			.then((DB) => {
				const data = JSON.parse(DB);
				for (var i = 0; i < data.orders.length; i++) {
					if (data.orders[i].orderID === orderID) {
						data.orders[i] = updatedOrder;
					}
				}
				const json = JSON.stringify(data);
				writeDB
					.writeOrdersDB(json)
					.then(() => {
						response.status(200).json({
							message: 'Order updated successfully',
							orderID: updatedOrder.orderID,
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

	/* ❌ Deletes an order from the DB */
	deleteOrder(request, response) {
		const { orderID } = request.body.order;
		readDB
			.readOrdersDB()
			.then((DB) => {
				const data = JSON.parse(DB);
				for (var i = 0; i < data.orders.length; i++) {
					if (data.orders[i].orderID === orderID) {
						data.orders.splice(i, 1);
					}
				}
				const json = JSON.stringify(data);
				writeDB
					.writeOrdersDB(json)
					.then(() => {
						response.status(200).json({
							message: 'Order deleted successfully',
							orderID: orderID,
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
};

module.exports = orderController;
