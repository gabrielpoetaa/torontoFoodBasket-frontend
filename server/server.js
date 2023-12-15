const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "../.env" });


const corsOptions = {
  origin: 'https://toronto-food-basket-ezf18bsfl-gabriels-projects-ce63e102.vercel.app/', // Replace with your Vercel app domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors());

const port = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';


// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin (not recommended for production)
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

app.listen(port, HOST, async () => {
  // perform a database connection when server starts
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});


