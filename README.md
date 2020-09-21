# Orders_Microservice
Generating an order microservice


## Creating a Sequelize application

### Database Schema
- The given legacy order schema is normalized into 5 tables namely Orders_Info, OrderItem_Info, Shipping_Info, Billing_Info, and Payment_Info.
- Orders_Info identifies each order individually and has customerId, customerName ans customerEmail fields. A single order can have multiple items which is ensured by the OrderItem_Info table.
- OrderItem_Info identifies each item individually and multiple items can have the same orderId which is ensured by the foriegn key(orderId). Apart from that, OrderItem_Info table consists of itemName, itemQty, orderShippingCharges, orderSubtotal, orderTax, orderTotal, and status.
- Each order item has a single instance of Shipping_Info associated with it which is ensured by itemId foreign key(one to one mapping). This table has shippingMethod, addrLine1, addrLine2, city, state, and zip info associated with it.
- Each order item has a sisngle instance of Billing_Info associated with it which is ensured by itemId foreign key(one to one mapping). This table has billing information in the form of columns addrLine1, addrLine2, city, state, and zip.
- Each order item can have multiple Payment methods, meaning the payment can be split over multiple cards. This is ensured by itemId foreign key(via a one to many relationship). paymentMethod, confirmationNumber, paymentAmount, cardNumber and cardCVV are some columns of this table.
- The schema is attached as shown below:
<br>
<img height="600" src="https://github.com/aniketgiriyalkar/Dice-app/blob/master/DiceAppOutput.PNG">
<br>

### Sequelize 
- Sequelize is a promise-based Node.js ORM for Postgres and other SQL databases. It features solid transaction support, relations, eager and lazy loading, read replication and more.
- An ORM library is a completely ordinary library written in your language of choice that encapsulates the code needed to manipulate the data, so you don't use SQL anymore; you interact directly with an object in the same language you're using. 
- sequelize is the sequelize library itself.
- pg short for postgres is a Postgres client for Node.js
- sequelize-cli is a package that enables us interact with the database through sequelize from the CLI.

### Installations
- Postgres
- Sequelize 
- Sequelize CLI with express

- Let's start by installing Postgres, Sequelize and Sequelize CLI in a new project folder orders_microservice
```
mkdir orders_microservice
cd orders_microservice
git init
npm init -y
npm i sequelize pg
npm i --save-dev sequelize-cli
```

- Also add the following in the .gitignore file to ease deployement later:
```
/node_modules
.DS_Store
.env
```

- Next, we initialize a Sequelize project using the command:
```
npx sequelize-cli init
```
- This will create a bunch of folders such as config, migrations, models and seeders
- config - contains the config.json which is the database configuration
- migrations - contains the migrations file which creates tables in the database
- models - models are Schema which maps with the DB Table.

### Setting up Postgres in Sequelize
- config.json will contain three environments such as development, test and production.
- change the config.json to postgres database in the ddevelopment environment
```
{
  "development": {
    "username": "postgres",
    "password": 123,
    "database": "orders_development",
    "host": "127.0.0.1",
    "port":5432,
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": 123,
    "database": "orders_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable":"DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  }
}

```
- for production we use use_env_variable and DATABASE_URL(future scope for now)

- next we can tell Sequelize CLI to create the Postgres database("npm install pg --save" if it says ERROR: Please install pg manually) :
```
npx sequelize db:create
```
n
### Defining models and adding seed data
- Following associations based on the schema that we created. We start by creating a Orders_Info model using Sequelize CLI:
```
npx sequelize-cli model:generate --name Orders_Info --attributes customerId:string,customerName:string,customerEmail:string
```

- Running model:generate automatically creates both a model file and a migration with the attributes we have specified. 

- Next we execute the command "npx sequelize-cli db:migrate" to create all the respective models in the database

- Next we, will find create seed file for each model using the command "npx sequelize-cli seed:generate --name ModelName"

- We will see a new file in the /seeders directory. In that file we will create enteries in the database. For example, the Orders_Infos seeder is as follows: 
```

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders_Infos', [{
      customerId: "CUST01",
      customerName: "Jack Ryan",
      customerEmail: "ryanj@mail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      customerId: "CUST02",
      customerName: "Sherlock Holmes",
      customerEmail: "sholmes@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      customerId: "CUST03",
      customerName: "Ethan Hunt",
      customerEmail: "ehunt@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders_Infos', null, {});
  }
};

```
### Creating Associations

- Creating the model OrderItem_Info
```
npx sequelize-cli model:generate --name OrderItem_Info --attributes orderId:integer,itemName:string,itemQty:integer,orderShippingCharges:decimal,orderSubTotal:decimal,orderTax:decimal,orderTotal:decimal,status:string
```

- For creating associations between two models we replace the code for orderitem_info.js in the /models subdirectory and replace the code with this:
```
module.exports = (sequelize, DataTypes) => {
  const OrderItem_Info = sequelize.define('OrderItem_Info',{
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model:'Orders_Info',
        key:'id',
        as:'orderId',
      }
    },
    itemName: DataTypes.STRING,
    itemQty: DataTypes.INTEGER,
    orderShippingCharges: DataTypes.DECIMAL,
    orderSubTotal: DataTypes.DECIMAL,
    orderTax: DataTypes.DECIMAL,
    orderTotal: DataTypes.DECIMAL,
    status: DataTypes.STRING
  }, {});

  OrderItem_Info.associate = function (models){
    // associations are defined here
    Item.belongsTo(models.Orders_Info,{
      foreignKey: 'orderId',
      onDelete: 'CASCADE'
    })
  };

  return OrderItem_Info;
};` 
```
- Now in the orders_info.js in the same directory we replace code with this:
```
module.exports = (sequelize, DataTypes) => {
  const Orders_Info = sequelize.define('Orders_Info', {
    customerId: DataTypes.STRING,
    customerName: DataTypes.STRING,
    customerEmail: DataTypes.STRING
  }, {});
  Orders_Info.associate = function(models){
    // associations can be defined here
    Orders_Info.hasMany(models.OrderItem_Info, {
      foreignKey: 'orderId'
    })
  };
  return Orders_Info;
};
```
- Next we perform the migration to create OrederItem_Infos table in Postgres Database.

- Then inside the /seeders subdirectory we add values to a file whose name ends with OrderItem_Infos.js
```
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OrderItem_Infos', [{
      orderId: 1,
      itemName: "Soccer Cap - Arsenal",
      itemQty: 1,
      orderShippingCharges: 12.75,
      orderSubTotal: 27.05,
      orderTax: 3.20,
      orderTotal: 43.0,
      status: "Processed and shipped",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      orderId: 2,
      itemName: "Soccer Shirt - Arsenal",
      itemQty: 1,
      orderShippingCharges: 12.75,
      orderSubTotal: 67.05,
      orderTax: 3.20,
      orderTotal: 83.0,
      status: "Out for delivery",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      orderId: 1,
      itemName: "Soccer Jacket - Arsenal",
      itemQty: 1,
      orderShippingCharges: 12.75,
      orderSubTotal: 147.05,
      orderTax: 3.20,
      orderTotal: 163.0,
      status: "Out for delivery",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      orderId: 3,
      itemName: "Soccer Shorts - Arsenal",
      itemQty: 2,
      orderShippingCharges: 12.75,
      orderSubTotal: 47.05,
      orderTax: 3.20,
      orderTotal: 63.0,
      status: "Delivered",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OrderItem_Infos', null, {});
  }
};
``` 

Similarly we create the models Shipping_Info, Billing_Info, and Payment_Info and set up the associations and perform seeding. Codes can be found in /models and /seeders under respective names

- Creating the model Shipping_Info:
```
npx sequelize-cli model:generate --name Shipping_Info --attributes itemId:integer,shippingMethod:string,addressLine1:string,addressLine2:string,city:string,state:string,zip:string
```

- Creating the Model Billing_Info:
```
npx sequelize-cli model:generate --name Billing_Info --attributes itemId:integer,addressLine1:string,addressLine2:string,city:string,state:string,zip:string
```

- Creating the Model Payment_Info:
```
npx sequelize-cli model:generate --name Payment_Info --attributes itemId:integer,paymentMethod:string,confirmationNumber:string,paymentAmount:decimal,cardNumber:string,cardCVV:string
```

- Now, we will run all the seed files to enter the information into the database. We use the command "npx sequelize-cli db:seed:all"

- Next, we query our tables and see if the data was correctly seeded.

- Once, the connection is set up, our Sequelize project is ready to roll.

## Setting up Express
- Now, we can incorporate Express and set up routes to serve our data
- We install Express, along with Nodemon to monitor changes in our files.
- Then install body-parser to handle the information from User requests.

```
npm install express --save
npm install nodemon -D
npm install body-parser
```

- We set up the architecture by creating two new directories and three new files:
```
mkdir routes controllers
files: server.js routes/index.js controllers/index.js
```

- We will modify "package.json" file to support nodemon. Also, we can facilitate development by creating a new command: "npm run db:reset".
```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js",
    "db:reset": "npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all"
  },
```
- We will set this up to drop the database, create the database and run the migrations, and seed a new whenever we need.

- Moving on to building the server, Inside the server.js file, we add the following:
```
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json())
app.use('/ecommerce', routes);
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
```
- Here we create a basic Express server set to listen on port 3000.
- But rather than defining the routes in this file, we have added "app.use('/api', routes);" to refer to any requests beginning with api to the index.js file in our /routes subdirectory

## Express Routers and Controllers
- We start by setting up the root route. In the /routes/index.js file, we add the following code:
```
const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();
router.get('/', (req, res) => res.send('This is Ecommerce Orders Home!'))
module.exports = router
``` 

- Next, we test the route using "npm start" command. Then open the root endpoint http://localhost:300/ecommerce in the browser.
- After verifying that our Express App works, we now need to make it deliver data from sequelize. We'll do this by creating a controller to handle all our logic - our pathways for creating new orders, updating orders, and cancelling orders, etc.

- In ./controllers/index.js add the following:
```
const { Orders_Info } = require('../models');
const createOrders_Info = async (req, res) => {
    try {
        const orders_info = await Orders_Info.create(req.body);
        return res.status(201).json({
            orders_info,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
module.exports = {
    createOrders_Info
}
```
- Here we have incorporated the Orders_Info model we defined in sequelize create a new database entry based on the information in the API request.
- To make this work, we will have to create a route on our server to connect the request with the controller. In ./routes/index.js, add a new line below 'This is Ecommerce Orders Home!' route:
```
router.post('/orders', controllers.createOrders_Info)
```
- This directs POST requests at /ecommerce/orders to the createOrders_Info function in our controller. To test it, we will need to use the REST client(like Postman etc). 
- Use POST method to send the following JSON body to http://localhost:3000/ecommerce/orders
```
{
    "customerId": "CUST05",
    "customerName": "Lewis Hamilton",
    "customerEmail": "ham@mail.com"
}
```
- So now we've used Router and a controller to deliver data from Sequelize to our API users. We can use the same strategy to connect any Sequelize query to an Express endpoint.

- Let's add controllers to perform more tasks: get all orders with their associated orderItems, get a specific order, update an order, and delete an order

- Test some of these end points making a GET, POST, PUT, or DELETE request in postman along with the appropriate request body for each end point.

- If your manual testing goes well, it's time to start building automated unit tests.

### Logging
- Its a good point to integrate better logging. Right now if we check out terminal when we hit http://localhost:3000/ecommerce/orders/2, we will see the raw SQL that was executed. For debugging purposes and overall better logging, let's install an Express middleware called "morgan" using the command "npm install morgan"

- Modify your server.js file to use Morgan (and also add module.exports = app, which we will be using later in testing)
```
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const logger = require('morgan');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json())
app.use(logger('dev'))

app.use('/ecommerce', routes);
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

module.exports = app

```
- After restarting(refresing the file) the server using "npm start", open http://localhost:3000/ecommerce/orders/2. We should now see in our terminal something like this: "GET /ecommerce/orders/2 304 104.273 ms". That's morgan!!

### Unit Testing
- Now we will configure our Express JSON API for unit tests. We will install JEST, which is a delightful JavaScript testing framework with a focus on simplicity:
```
npm install jest --save-dev
```
- We will also use SuperTest for testing our HTTP endpoints on our ExpressAPI
```
npm install supertest --save-dev
```
- We need to make two changes in package.json to configure JEST. First, under the "scripts" attribute, lets edit pur test command to use Jest.
```
"test":"jest --coverage",
```
- Coverage gives a graphical representation of tests, when we open the html file in the browser.
- Let's write a simple test to make sure our setup works. First we will make a new directory for our tests, then we will make a file called base.test.js. 
- We create a new file called base.test.js.
- Now we add the following code in the base.test.js to create a test that will test whether 1 + 1 = 2:
```
describe('Initial Test', () => {
  it('should test that 1 + 1 === 2', () => {
    expect(1+1).toBe(2)
  })
})
```

- Looking at the syntax. We pass strings to give the test a title and to describe what it does. Then, if the expression passed to expect() evaluates to the value within .toBe(), the test will pass. Let's make sure our setup works by typing the command "npm test".
- Once we test that the jest is working fine. We put it to practical test.

## Setting up Test Environment
- First we need to set up our test scripts to use a test database - it would not be a good idea to let our tests manipulate our real data. We'll arrange this by using an npm package called cross-env:
"npm install cross-env --save-dev"
- This lets us pass environment variables in npm scripts, which in this case we will use to specify a test environment. Lets again configure the "scripts" section to our package.json to do this:
```
"test": "cross-env NODE_ENV=test jest --testTimeout=10000",
"pretest": "cross-env NODE_ENV=test npm run db:reset",
"db:create:test": "cross-env NODE_ENV=test npx sequelize-cli db:create",
```
- Try it "npm run db:create:test" and then "npm test"
- The pretest script builds your test database afresh before running the tests and using NODE_ENV=test lets our script do all that without altering our normal database. 
- In addition, your terminal should also show that our base test in Jest has passed

## Writing tests with Jest and SuperTest
- We write our first route test. Creating the test file for routes (routes.test.js)
- We are going to write this using Jest framework and call the HTTP methods using SuperTest.

Let's test the /ecommerce/orders endpoint. When we do a GET request to that endpoint, we should get back a list of all orders in the database, right? Open routes.test.js and add this code:
```
const request = require('supertest')
const app = require('../server.js')
describe('Order API', () => {
    it('should show all orders', async () => {
        const res = await request(app).get('/ecommerce/orders')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('orders')
    })
})
```
- We should see two passing tests now in two test suites.

- Next, we will add another test to the same User API test suite, this one is for "/ecommerce/orders/2" endpoint.
- At this endpoiny, a GET request should return a specific user from the database. In "tests/routes.test.js", add the following just below the previous test:
```
 it('should show a user', async () => {
        const res = await request(app).get('/ecommerce/orders/2')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('orders_info')
    }),
```
- On running "npm test", we see that three tests successfully passed. 
- We write more tests for other aspects of our API. The code below includes tests for creating, updating, and deleting orders in our app:
```
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
```

- We see that the new tests use .post(), .put(), and .del() methods, and that the body of a test request can be defined within .send().
- We see that all the six passing tests and have the test coverage for the express API!

#