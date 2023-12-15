const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "../.env" });
const port = process.env.PORT || 5000;


const { MongoClient } = require("mongodb");
const Db = process.env.MONGODB_URI;
const client = new MongoClient(Db, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
 
var _db;

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

app.listen(port, async () => {
  // perform a database connection when server starts
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

 
module.exports = {
    connectToServer: async function (callback) {
  
      try {
        await client.connect();
      } catch (e) {
        console.error(e);
      }
  
      _db = client.db("foodBasket");
  
      return (_db === undefined ? false : true);
    },
    getDb: function () {
      return _db;
    },
  };