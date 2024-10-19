import { Db, MongoClient, ServerApiVersion } from 'mongodb';

export let mongoClient: MongoClient;
export let db: Db;

export const connectToDB = async (mongoUri: string,  dbName: string) => {
  mongoClient = new MongoClient(mongoUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });  
  try {
    await mongoClient.connect();
    db = mongoClient.db(dbName);
    console.log("MongoDB connected. Database name: ", db.databaseName);
  } catch (error) {
    console.error("An error occurred while connecting to MongoDB: ", error);
  }
};

process.on('SIGINT', function() {
    mongoClient.close();
    console.log('mongoClient disconnected on app termination');
    process.exit(0);
  });