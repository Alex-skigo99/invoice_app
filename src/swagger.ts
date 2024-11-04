// src/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for my Express app',
    },
  },
  apis: [path.join(__dirname, '../openapi.yml')], // Point to the openapi.yml file
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
export default swaggerDocs;