const request = require('supertest')
const app = require('./server.js')

describe('Order API', () => {
    it('should show all orders', async () => {
        const res = await request(app).get('/ecommerce/orders')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('orders_infos')
    }),
    it('should show an order', async () => {
        const res = await request(app).get('/ecommerce/orders/3')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('orders_info')
    }),
    it('should create a new order', async () => {
        const res = await request(app)
            .post('/ecommerce/orders')
            .send({
                customerId: 'CUST06',
                customerName: 'Sebastian Vettel',
                customerEmail: 'vettel@mail.com'
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('orders_info')
    }),
    it('should update an order', async () => {
        const res = await request(app)
            .put('/ecommerce/orders/3')
            .send({
                customerId: 'CUST06',
                customerName: 'Sebastian Vettel',
                customerEmail: 'vettel@gmail.com'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user')
    }),
    it('should delete an order', async () => {
        const res = await request(app)
            .del('/ecommerce/orders/3')
        expect(res.statusCode).toEqual(204)
    })
})