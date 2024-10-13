import express from 'express';
import { mainController } from '../controllers/main_controller';

export const mainRouter = express.Router();

mainRouter.get('/invoices', mainController.read);
mainRouter.post('/invoices', mainController.create);
mainRouter.patch('/invoices', mainController.update);
mainRouter.delete('/invoices/:dbId', mainController.delete);
mainRouter.get('/hello', mainController.hello);
