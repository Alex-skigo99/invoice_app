import express from 'express';
import cors from 'cors';
import path from "path";
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../swagger';
import { mainRouter } from '../routers/main_router';
import { errorHandler } from '../middleware/errorMiddleware';

export function createExpressServer() {
    const app = express();
    
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(express.static(path.resolve(__dirname, "../../client/build")));
    app.use(cors());
    
    // Swagger route
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    
    app.use('/api/', mainRouter);
    
    app.get('/', (req, res) => {
        res.render(path.resolve(__dirname, "../../client/build", "index.html"));
    });

    // All other GET requests not handled before will return our React app
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
    });
    
    app.use(errorHandler);
    
    return app;
};
