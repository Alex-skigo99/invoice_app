import express from 'express';
import cors from 'cors';
import path from "path";
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger';

import { mainRouter } from './routers/main_router';
import { errorHandler } from './middleware/errorMiddleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(cors());

app.get('/', (req, res) => {
  res.render(path.resolve(__dirname, "../client/build", "index.html"));
});

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/', mainRouter);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`run on ${PORT}`);
    console.log(`API docs available at http://localhost:${PORT}/api-docs`);
});
