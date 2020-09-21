const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const logger = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc'); // to bind swagger with express and show ui provided by swagger js-doc
const swaggerUi = require('swagger-ui-express'); // for api documentation

const PORT = process.env.PORT || 3000;
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce Orders Service',
            version: '1.0.0'
        },       
        
    }, 
    // path to api docs
    apis: ["./routes/index.js"]
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const app = express();
app.use(bodyParser.json())
app.use(logger('dev'))

app.use('/ecommerce', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

module.exports = app
