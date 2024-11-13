import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { mainController } from '../controllers/main_controller';

export const mainRouter = express.Router();

mainRouter.get('/invoices', asyncHandler(mainController.read));
mainRouter.post('/invoices', asyncHandler(mainController.create));
mainRouter.patch('/invoices/:dbId', asyncHandler(mainController.update));
mainRouter.delete('/invoices/:dbId', asyncHandler(mainController.delete));
mainRouter.get('/hello', asyncHandler(mainController.hello));
