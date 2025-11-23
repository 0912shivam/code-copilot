const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Code Generation Copilot API',
      version: '1.0.0',
      description: 'AI-powered code generation API using OpenAI GPT',
      contact: {
        name: 'Amit Godara',
        url: 'https://github.com/mr-godara/Code-Copilot',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Health',
        description: 'Health check endpoints',
      },
      {
        name: 'Languages',
        description: 'Supported programming languages',
      },
      {
        name: 'Generate',
        description: 'Code generation endpoints',
      },
      {
        name: 'History',
        description: 'Generation history endpoints',
      },
    ],
  },
  apis: ['./src/controllers/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
