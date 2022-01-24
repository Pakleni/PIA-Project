import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/piamean");
const connection = mongoose.connection;

// CONNECTION EVENTS
connection.once("open", () => {
  console.log("db connection ok!");
});
connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});
connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});
process.on("SIGINT", function () {
  connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

// ROUTER
app.get("/", (req, res) => res.send("Hello!"));
app.listen(4000, () => console.log(`Express server running on port 4000`));
