/*
📢 This file contains some tests for some API.
In order to run tests, change directory to src 
folder and run npm test
*/

const supertest = require('supertest');
const request = require('supertest');
const app = require('../app');
const setDB = require('../config/setup');

describe('order endpoints test', () => {
	/* Using test DB for tests */
	setDB.configure('test');

	it('should create a new order', async () => {
		const response = await request(app)
			.post('/api/order/create_order')
			.send({
				order: {
					customerID: 'dff333df-43d1-462f-b476-dabf01c3e724',
					type: 'clothes',
					items: ['shirt', 'pants', 'tie', 'shoes'],
					total_items: 4,
					cost: '300',
				},
			});
		expect(response.statusCode).toEqual(200);
		expect(response.body).toHaveProperty('message');
		expect(response.body).toHaveProperty('orderID');
		expect(response.body.message).toEqual('Order placed successfully');
	});

	it('should return validation error for incorrect customer ID', async () => {
		const response = await request(app)
			.post('/api/order/create_order')
			.send({
				order: {
					customerID: 'wegwef',
					type: 'grocery',
					items: ['mango', 'pineapple', 'chicken', 'bread'],
					total_items: 4,
					cost: '120',
				},
			});
		expect(response.statusCode).toEqual(406);
		expect(response.body.message).toEqual('Customer ID is not valid');
	});

	it('should return existing order records', async () => {
		const response = await request(app).get('/api/order/get_all');
		expect(response.statusCode).toEqual(200);
		expect(response.body.message).toEqual('Orderes successfully retrieved');
	});
});

describe('customer endpoints test', () => {
	it('should create a new customer', async () => {
		const response = await request(app)
			.post('/api/customer/add_customer')
			.send({
				customer: {
					firstName: 'JACK',
					lastName: 'MAH',
					age: 55,
					address: 'beijing, china',
					phoneNumber: 12345678909,
				},
			});
		console.log(response.body);
		expect(response.statusCode).toEqual(200);
		expect(response.body).toHaveProperty('message');
		expect(response.body).toHaveProperty('customerID');
		expect(response.body.message).toEqual(
			'customer added into the DB successfully'
		);
	});
});
