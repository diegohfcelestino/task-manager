import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { router } from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './docs/swagger.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(router);
app.listen(PORT, () => {
    console.log(`Server está rodando em http://localhost:${PORT}`);
    console.log(`A documentação da api se encontra em http://localhost:${PORT}/api-docs`);
});
