const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();


router.get('/', (req, res) => res.send('This is Ecommerce Orders Home!'));
 /**  
 * @swagger 
 * /ecommerce/orders:
 *    post:
 *      summary: create new order
 *      description: creates a new order
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                 customerId:
 *                   type: string
 *                   description: customer Id of the customer
 *                 customerName:
 *                   type: string
 *                   description: name of the customer
 *                 customerEmail:
 *                   type: string
 *                   description: email of the customer
 *      responses:
 *        201:
 *          description: order created successfully
 *        422:
 *          description: order already exists
 */
router.post('/orders', controllers.createOrders_Info);

 /**
 *  @swagger
 *  /ecommerce/orders/{id}:   
 *    put:
 *      summary: update an order
 *      description: update an existing order
 *      parameters:
 *        - name: "id"
 *          description: "order id that needs to be updated"
 *          required: true
 *          type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                 customerId:
 *                   type: string
 *                   description: customer Id of the customer
 *                 customerName:
 *                   type: string
 *                   description: name of the customer
 *                 customerEmail:
 *                   type: string
 *                   description: email of the customer
 *      responses:
 *        200:
 *          description: order updated successfully
 *        404:
 *          description: order with specific id does not exist
 */
router.put('/orders/:id', controllers.updateOrder);

/**
 *  @swagger
 *  /ecommerce/orders:   
 *    get:
 *      summary: gets all orders
 *      description: gets information of all orders
 *      responseBody:
 *        content:
 *      responses:
 *        200:
 *          description: orders successfully obtained
 *        404:
 *          description: orders do not exist
 */
router.get('/orders', controllers.getAllOrders);

/**
 *  @swagger
 *  /ecommerce/orders/{id}:   
 *    get:
 *      summary: get order with specific id
 *      description: gets information of order with given id
 *      parameters:
 *        - name: "id"
 *          description: "order id that needs to be updated"
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: order with respective successfully obtained
 *        404:
 *          description: order with the given id does not exist
 */
router.get('/orders/:id', controllers.getOrderById);

/**
 *  @swagger
 *  /ecommerce/orders/{id}:   
 *    delete:
 *      summary: delete order with given order id.
 *      description: deletes the order with given order id.
 *      parameters:
 *        - name: "id"
 *          description: "order id that needs to be updated"
 *          required: true
 *          type: string
 *      responses:
 *        204:
 *          description: order with given successfully deleted
 *        404:
 *          description: order with the given id does not exist
 */
router.delete('/orders/:id', controllers.deleteOrder)



module.exports = router