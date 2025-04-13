const swaggerJSDoc = require('swagger-jsdoc');
const generateSchemasAndPaths = require('./generateSwaggerComponents');

const { schemas, paths } = generateSchemasAndPaths();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Generic CRUD API',
    version: '1.0.0',
    description: 'API generada automáticamente desde entidades y BaseRepository con soporte de criterios declarativos'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desarrollo'
    }
  ],
  components: {
    schemas
  },
  paths
};

const options = {
  swaggerDefinition,
  apis: []
};

const swaggerSpec = swaggerJSDoc(options);

// Agrega ejemplos globales de uso de criteria como referencia
swaggerSpec.components.examples = {
  CriteriaStringExample: {
    summary: "Uso de criteria como string",
    value: "(name = 'Juan' OR age > 30) AND active = true"
  },
  CriteriaObjectExample: {
    summary: "Uso de criteria como JSON declarativo",
    value: {
      "$or": [
        { "name": { "$like": "%Juan%" } },
        { "email": { "$like": "%@gmail.com" } }
      ],
      "active": true
    }
  }
};

module.exports = swaggerSpec;
