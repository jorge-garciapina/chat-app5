const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

// Connection URL
const url = "mongodb://localhost:27017";

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function manageDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to server");

    const adminDb = client.db().admin();

    const db = client.db("service-user");

    ////////////////////////////////////////////////////////////
    // LIST ALL AVAILABLE DATABASES
    // const databases = await adminDb.listDatabases();
    // console.log("Available databases:");
    // console.log(databases.databases);
    ////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    // LIST ALL AVAILABLE CONNECTIONS IN A DATABASE
    // const collections = await db.listCollections().toArray();
    // console.log("Available collections:");
    // console.log(collections);
    ////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    // FIND ALL DOCUMENTS IN A PARTICULAR COLLECTION
    const collection = db.collection("users");
    const docs = await collection.find({}).toArray();
    console.log("Found the following records");
    console.log(docs);
    ////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    // DELETE A DOCUMENT USING ITS ID
    // const idToDelete = "5f50c31b1c4ae0f64deab85f"; // replace with the id of the document you want to delete
    // const deleteResult = await collection.deleteOne({
    //   _id: new ObjectId(idToDelete),
    // });
    // console.log("Deleted document count:", deleteResult.deletedCount);
    ////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    // DELETE ALL DOCUMENTS IN A COLLECTION
    // const deleteAllResult = await collection.deleteMany({});
    // console.log("Deleted all documents count:", deleteAllResult.deletedCount);
    ////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    // DROP A PARTICULAR COLLECTION
    // const dropResult = await collection.drop();
    // console.log("Collection dropped:", dropResult);
    ////////////////////////////////////////////////////////////
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  } finally {
    await client.close();
  }
}

manageDatabase();
