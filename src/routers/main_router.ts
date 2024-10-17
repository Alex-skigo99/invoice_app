import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { mainController } from '../controllers/main_controller';

export const mainRouter = express.Router();

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Get all invoices from the database. Filter by query parameters.
 *     tags: 
*        - Invoices
 *     responses:
 *       200:
 *         description: Success
 *     */
mainRouter.get('/invoices', asyncHandler(mainController.read));
/**
 * @swagger
 * /api/invoices:
 *   post:
 *     summary: Create a new invoice in the database.
 *     tags:
 *       - Invoices
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       200:
 *         description: Success
 */
mainRouter.post('/invoices', asyncHandler(mainController.create));
/**
 * @swagger
 * /api/invoices/{dbId}:
 *   patch:
 *     summary: Update an existing invoice in the database.
 *     tags:
 *       - Invoices
 *     parameters:
 *       - in: path
 *         name: dbId
 *         required: true
 *         schema:
 *           type: string
 *         description: The database ID of the invoice
 *         example: 5f3f7b3b7f3d3b001f3f7b3b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Invoice not found
 */
mainRouter.patch('/invoices/:dbId', asyncHandler(mainController.update));
/**
 * @swagger
 * /api/invoices/{dbId}:
 *   delete:
 *     summary: Delete an invoice from the database.
 *     tags:
 *       - Invoices
 *     parameters:
 *       - in: path
 *         name: dbId
 *         required: true
 *         schema:
 *           type: string
 *         description: The database ID of the invoice
 *         example: 5f3f7b3b7f3d3b001f3f7b3b
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: An error occurred while connecting to MongoDB
 */
mainRouter.delete('/invoices/:dbId', asyncHandler(mainController.delete));
/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Check connection to the database.
 *     tags:
 *       - Hello
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: An error occurred while connecting to MongoDB
 */
mainRouter.get('/hello', asyncHandler(mainController.hello));

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       required:
 *         - id
 *         - createdAt
 *         - paymentDue
 *         - description
 *         - paymentTerms
 *         - clientName
 *         - status
 *         - senderAddress
 *         - clientAddress
 *         - items
 *         - total
 *       properties:
 *         _id:
 *           type: string
 *           example: "67076daeff638e662763807c"
 *         id:
 *           type: string
 *           example: "FV2353"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2021-11-05T00:00:00.000Z"
 *         paymentDue:
 *           type: string
 *           format: date-time
 *           example: "2021-11-12T00:00:00.000Z"
 *         description:
 *           type: string
 *           example: "Logo Re-design"
 *         paymentTerms:
 *           type: integer
 *           example: 7
 *         clientName:
 *           type: string
 *           example: "Anita Wainwright"
 *         clientEmail:
 *           type: string
 *           example: ""
 *         status:
 *           type: string
 *           example: "draft"
 *         senderAddress:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *               example: "19 Union Terrace"
 *             city:
 *               type: string
 *               example: "London"
 *             postCode:
 *               type: string
 *               example: "E1 3EZ"
 *             country:
 *               type: string
 *               example: "United Kingdom"
 *         clientAddress:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *               example: ""
 *             city:
 *               type: string
 *               example: ""
 *             postCode:
 *               type: string
 *               example: ""
 *             country:
 *               type: string
 *               example: ""
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Logo Re-design"
 *               quantity:
 *                 type: integer
 *                 example: 1
 *               price:
 *                 type: number
 *                 format: double
 *                 example: 3102.04
 *               total:
 *                 type: number
 *                 format: double
 *                 example: 3102.04
 *         total:
 *           type: number
 *           format: double
 *           example: 3102.04
 */