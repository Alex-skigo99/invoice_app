import { Db, MongoClient } from 'mongodb';
import { logger } from '../middleware/logger';

export let mongoClient: MongoClient;
export let db: Db;

export const connectToDB = async (mongoUri: string,  dbName: string) => {
  mongoClient = new MongoClient(mongoUri);  
  await mongoClient.connect();
  db = mongoClient.db(dbName);
  logger.info(`MongoDB connected. Database name: ${db.databaseName}`);
};

// Gracefully close MongoDB connection and server on process termination
process.on('SIGINT', async () => {
  mongoClient.close();
  logger.info('Received SIGINT. Closing MongoDB connection...');
  process.exit(0);
});

process.on('exit', async () => {
  mongoClient.close();
  logger.info('Received exit. Closing MongoDB connection...');
  process.exit(0);
});