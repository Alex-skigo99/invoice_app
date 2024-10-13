import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI as string;
const databaseName = "enterprise";

const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export let db: Db;

(async (dbName: string) => {
  try {
    await mongoClient.connect();
    db = mongoClient.db(dbName);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("An error occurred while connecting to MongoDB: ", error);
  }
}) (databaseName);

process.on('SIGINT', function() {
    mongoClient.close();
    console.log('mongoClient disconnected on app termination');
    process.exit(0);
  });