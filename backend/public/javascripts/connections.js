const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://dev:dev@cluster0.2lnyb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connection = {};

connection.getConnection = async function () {
  try {
    // Connect the client to the server
    await client.connect();
    // Return the database instance
    return client.db("Wanderlust_DB");
  } catch (err) {
    console.error('Failed to connect to MongoDB Atlas', err);
    throw err;
  }
};

module.exports = connection;