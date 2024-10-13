import swaggerJsDoc from 'swagger-jsdoc'

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
        },
    },
    apis: [
        'swagger/docsFiles/users/*.yaml',
        'swagger/docsFiles/posts/*.yaml',
        'swagger/docsFiles/comments/*.yaml'
    ],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);