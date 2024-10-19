import { createExpressServer } from './config/serverExpress';
import dotenv from 'dotenv';
import { connectToDB } from './config/mongoDB';

dotenv.config();

const app = createExpressServer();

const mongoUri = process.env.MONGODB_URI as string;
if (!mongoUri) {
    console.error('MongoDB URI is not set in the environment variables.');
    process.exit(1);
  };  
const dbName = "enterprise";
connectToDB(mongoUri, dbName);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`run on ${PORT}`);
    console.log(`API docs available at http://localhost:${PORT}/api-docs`);
});
