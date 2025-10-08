import swaggerJSDoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Tarefas',
      version: '1.0.0',
      description: 'Uma API simples para gerenciar usuários e tarefas'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de Desenvolvimento'
      },
      {
        url: 'https://task-manager-api-mkj6.onrender.com',
        description: 'Servidor de Produção'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        UserInput: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string' }
          }
        },
        UserUpdateInput: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' }
          }
        },
        Task: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            status: {
              type: 'string',
              enum: ['PENDING', 'IN_PROGRESS', 'DONE']
            },
            createdAt: { type: 'string', format: 'date-time' },
            userId: { type: 'string' }
          }
        },
        TaskWithUser: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            userId: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                name: { type: 'string' }
              }
            }
          }
        },
        TaskInput: {
          type: 'object',
          required: ['title', 'description', 'userId'],
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            userId: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
