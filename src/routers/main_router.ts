import express from 'express';
import { mainController } from '../controllers/main_controller';

export const mainRouter = express.Router();

mainRouter.get('/hello', mainController.hello);
