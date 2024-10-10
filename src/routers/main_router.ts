import express from 'express';
import { mainController } from '../controllers/main_controller';

export const mainRouter = express.Router();

mainRouter.get('/invoices', mainController.readAll);
mainRouter.post('/invoices', mainController.create);
mainRouter.put('/invoices', mainController.update);
mainRouter.delete('/invoices/:dbId', mainController.delete);
mainRouter.get('/hello', mainController.hello);
