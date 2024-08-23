const mongoose = require("mongoose");
require('dotenv').config({ path: '../../.env' })
const db = process.env.MONGO_DATABASE;
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const url = process.env.MONGO_URL
//const db_uri = process.env.MONGO_URI;
const port = process.env.MONGO_DOCKER_PORT;

const uri = process.env.MONGO_URI;
//const uri = `mongodb://${user}:${pass}@${url}:${port}/${db}`
mongoose
  .connect(uri)
  .then((conn) => {
    conn.connection.name = db
    console.log(`Established a connection to the database: ${conn.connection.name}`);
  })
  .catch((err) => {
    console.log(
      "❌❌ Something went wrong when connecting to the database ❌❌",
      err
    );
    console.log(
      `❌ URI: ${uri} ❌`
    );
  });
