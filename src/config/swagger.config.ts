import swaggerJsdoc from 'swagger-jsdoc';
import {SwaggerOptions} from "swagger-ui-express";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Account API',
      version: '1.0.0',
      description: '계정 관리 API 문서',
    },
    servers: [
      {
        url: 'http://3.37.46.45:30300',
        description: 'API 서버'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT 액세스 토큰을 입력하세요'
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
          description: '리프레시 토큰 쿠키'
        }
      }
    }
  },
  apis: ['./src/route/*.ts']
};

export const specs = swaggerJsdoc(options);

export const swaggerUiOptions: SwaggerOptions = {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "API 문서",
    swaggerOptions: {
        requestInterceptor: (req: any) => {
            req.credentials = 'include';
            return req;
        },
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        withCredentials: true,
        defaultModelsExpandDepth: 1,
    }
};