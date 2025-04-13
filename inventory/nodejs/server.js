const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');
const swaggerSpec = require('./docs/swagger');

dotenv.config();

const registerCrudRoutes = require('./cplatkm/api/crudRoutesRegister');

const app = express();
app.use(bodyParser.json());

registerCrudRoutes(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log('server on http://localhost:3000');
  console.log('Swagger documenton http://localhost:3000/api-docs');
});
