// src/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for my Express app',
    },
  },
  apis: ['src/routers/*.ts'], // Point to the files where API routes are defined
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
export default swaggerDocs;