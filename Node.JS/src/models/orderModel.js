/*
📢 This function depicts how a order will be saved in the DB.
This function is called whenever a new entry is to be made 
in the DB or an existing entry is to be updated.
*/
const { v4: uuidv4 } = require('uuid');

const orderModel = (customerID, type, items, total_items, cost) => {
	return {
		customerID: customerID,
		type: type,
		items: items,
		total_items: total_items,
		cost: cost,
		order_time: new Date().toLocaleString(),
		orderID: uuidv4(),
	};
};

module.exports = orderModel;
