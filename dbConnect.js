require("dotenv").config();

//mongodb connection....
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://shamail:1234@cluster0.9znjkrk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect((err, db) => {
  //   projectCollection = client.db().collection(collectionName);
  if (!err) {
    console.log("MongoDb connected succesfully");
  } else {
    console.log("Db Error:", err);
    process.exit(1);
  }
});

module.exports = client;
