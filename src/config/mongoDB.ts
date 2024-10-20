import { Db, MongoClient } from 'mongodb';

export let mongoClient: MongoClient;
export let db: Db;

export const connectToDB = async (mongoUri: string,  dbName: string) => {
  mongoClient = new MongoClient(mongoUri);  
  await mongoClient.connect();
  db = mongoClient.db(dbName);
  console.log("MongoDB connected. Database name: ", db.databaseName);
};

// process.on('SIGINT', function() {
//     mongoClient.close();
//     console.log('mongoClient disconnected on app termination');
//     process.exit(0);
//   });

// Gracefully close MongoDB connection and server on process termination
process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing MongoDB connection...');
  await mongoClient.close();
  // server.close(() => {
  //   console.log('Server closed');
  //   process.exit(0);
  // });
});

process.on('exit', async () => {
  console.log('Received exit. Closing MongoDB connection...');
  await mongoClient.close();
  // server.close(() => {
  //   console.log('Server closed');
  //   process.exit(0);
  // });
});