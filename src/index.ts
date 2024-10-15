import express from 'express';
import cors from 'cors';
import path from "path";
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

app.use('/api/', mainRouter);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
    console.log(`run on ${process.env.PORT || 3001}`);
});

console.log("Node is running");
