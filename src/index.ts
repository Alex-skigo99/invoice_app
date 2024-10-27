import { createExpressServer } from './config/serverExpress';
import dotenv from 'dotenv';
import { connectToDB } from './config/mongoDB';
import { logger } from './middleware/logger';

dotenv.config();

const app = createExpressServer();

const mongoUri = process.env.MONGODB_URI as string;
if (!mongoUri) {
    logger.error('MongoDB URI is not set in the environment variables.');
    process.exit(1);
  };  
const dbName = "enterprise";

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
    await connectToDB(mongoUri, dbName);
    logger.info(`run on ${PORT}`);
    logger.info(`API docs available at http://localhost:${PORT}/api-docs`);
});
